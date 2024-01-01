export const MAP_ICON = {
    url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    fillColor: '#558b2f',
    fillOpacity: 1,
    strokeWeight: 0,
    scale: 10 
}

export const POI_INFO_WINDOW = (name: string, radius: number): string => `<p><strong>Point of Interest/${name}</strong></p><br><p>Radius: ${radius}m</p>`;

export const MARKER_INFO_WINDOW: string = `<p><strong>Vehicle Position Data</strong></p>`;