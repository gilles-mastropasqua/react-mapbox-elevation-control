import mapboxgl from 'mapbox-gl';
import './styles.css';

class ElevationControl implements mapboxgl.IControl {
    private map: mapboxgl.Map | null = null;
    private container: HTMLElement;
    private isActive: boolean = false;
    private tooltip: HTMLDivElement | null = null;

    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
        const button = document.createElement('button');
        button.title = 'Elevation';
        button.onclick = this.toggleClickMode.bind(this);
        this.container.appendChild(button);
        button.className = 'mapbox-elevation-control';
    }

    onAdd(map: mapboxgl.Map) {
        this.map = map;

        if (map.isStyleLoaded()) {
            this.initializeElevationControl();
        } else {
            map.on('load', this.initializeElevationControl);
        }

        return this.container;
    }

    onRemove() {
        if (this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        if (this.tooltip) {
            this.tooltip.remove();
        }
        this.map?.off('load', this.initializeElevationControl);
        this.map = null;
    }

    private initializeElevationControl = () => {
        if (this.map && !this.map.getSource('mapbox-dem')) {
            this.map.addSource('mapbox-dem', {
                type: 'raster-dem',
                url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
                tileSize: 512,
                maxzoom: 14,
            });
            this.map.setTerrain({ source: 'mapbox-dem', exaggeration: 1 });
        }
    };

    private toggleClickMode() {
        this.isActive = !this.isActive;

        if (this.map) {
            if (this.isActive) {
                this.map.getCanvas().style.cursor = 'crosshair';
                this.createTooltip();
                this.map.on('mousemove', this.updateTooltip);
                this.map.on('mouseleave', this.hideTooltip);
                this.map.on('click', this.deactivateMode);
                document.addEventListener('click', this.handleOutsideClick);
            } else {
                this.deactivateMode();
            }
        }
    }

    private createTooltip() {
        if (!this.map) return;
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'elevation-tooltip';
        document.body.appendChild(this.tooltip);
    }

    private removeTooltip() {
        if (this.tooltip) {
            this.tooltip.remove();
            this.tooltip = null;
        }
        this.map?.off('mousemove', this.updateTooltip);
        this.map?.off('mouseleave', this.hideTooltip);
    }

    private updateTooltip = (event: mapboxgl.MapMouseEvent) => {
        if (!this.map || !this.tooltip || !this.isActive) return;

        const lngLat = event.lngLat;
        const elevation = this.map.queryTerrainElevation([lngLat.lng, lngLat.lat]);

        this.tooltip.textContent = elevation !== null && elevation !== undefined
            ? `Elevation: ${elevation.toFixed(2)} m`
            : 'Elevation not available';

        this.tooltip.style.display = 'block';
        this.tooltip.style.left = `${event.originalEvent.pageX + 10}px`;
        this.tooltip.style.top = `${event.originalEvent.pageY + 10}px`;
    };

    private hideTooltip = () => {
        if (this.tooltip) {
            this.tooltip.style.display = 'none';
        }
    };

    private deactivateMode = () => {
        this.isActive = false;
        if (this.map) {
            this.map.getCanvas().style.cursor = '';
            this.removeTooltip();
            this.map.off('mousemove', this.updateTooltip);
            this.map.off('mouseleave', this.hideTooltip);
            this.map.off('click', this.deactivateMode);
        }
        document.removeEventListener('click', this.handleOutsideClick);
    };

    private handleOutsideClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!this.container.contains(target)) {
            this.deactivateMode();
        }
    };
}

export default ElevationControl;
