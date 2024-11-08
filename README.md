# react-mapbox-elevation-control

A Mapbox GL JS control that allows users to measure the elevation of a point on the map. Once activated, click on a location on the map to display the elevation at that point.

![Minimap exemple](https://3w-creation.net/demo-react-mapbox-elevation-control.png)

## Installation

Install the package via npm:

```bash
npm install react-mapbox-elevation-control
```

## Usage

1. **Import the control** into your Mapbox GL JS application.
2. **Add the control** to your map instance.
3. **Include the CSS file** for styling.

### Example

```typescript
import mapboxgl from 'mapbox-gl';
import { ElevationControl } from 'react-mapbox-elevation-control';
import 'react-mapbox-elevation-control/dist/styles.css';

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/outdoors-v12', 
    center: [16.3738, 48.2082], 
    zoom: 4.5
});

// Add the ElevationControl to the map
map.addControl(new ElevationControl(), 'top-right');
```

## CSS Customization

You can adjust the appearance of the control button and tooltip by modifying the included CSS file.

- **`.mapbox-elevation-control`** - Styles the button for the elevation control.
- **`.elevation-tooltip`** - Styles the tooltip that displays the elevation.

### Example of CSS Customization

```css
.mapbox-elevation-control {
    width: 40px;
    height: 40px;
    background: url('data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22150%22%20viewBox%3D%220%200%20100%20150%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Crect%20x%3D%2210%22%20y%3D%2210%22%20width%3D%2280%22%20height%3D%2215%22%20fill%3D%22black%22%20/%3E%3Cpolygon%20points%3D%2250%2C35%2030%2C65%2070%2C65%22%20fill%3D%22black%22%20/%3E%3Crect%20x%3D%2245%22%20y%3D%2265%22%20width%3D%2210%22%20height%3D%2250%22%20fill%3D%22black%22%20/%3E%3Cpolygon%20points%3D%2250%2C115%2030%2C85%2070%2C85%22%20fill%3D%22black%22%20/%3E%3Crect%20x%3D%2210%22%20y%3D%22125%22%20width%3D%2280%22%20height%3D%2215%22%20fill%3D%22black%22%20/%3E%3C/svg%3E');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 60%;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}


.elevation-tooltip {
    position: absolute;
    padding: 4px 8px;
    background-color: #333;
    color: #fff;
    border-radius: 4px;
    pointer-events: none;
    font-size: 12px;
    z-index: 9999;
}
```

## Requirements

- **Mapbox GL JS** v2 or higher
- A Mapbox Access Token

## License

This project is licensed under the MIT License.

