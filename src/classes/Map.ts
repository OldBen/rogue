import { Scene, Tilemaps } from "phaser";

export class Map {

    scene: Scene;
    key: string;
    tilesetName: string;
    bgLayerName: string;
    blockLayerName: string;
    map: Tilemaps.Tilemap;
    tiles: Tilemaps.Tileset | null;
    backgroundLayer: Tilemaps.TilemapLayer | null;
    blockedLayer: Tilemaps.TilemapLayer | null;

    constructor(scene: Scene, key: string, tilesetName: string, bgLayerName: string, blockLayerName: string) {
        this.scene = scene;
        this.key = key;
        this.tilesetName = tilesetName;
        this.bgLayerName = bgLayerName;
        this.blockLayerName = blockLayerName;
        this.createMap();
    }

    createMap() {
        this.map = this.scene.make.tilemap({key: this.key});
        this.tiles = this.map.addTilesetImage(this.tilesetName, this.tilesetName, 32, 32);
        if (this.tiles === null) throw new Error("Failed to load tileset");
        
        this.backgroundLayer = this.map.createLayer(this.bgLayerName, this.tiles, 0, 0);
        this.blockedLayer = this.map.createLayer(this.blockLayerName, this.tiles, 0, 0);
        if (this.backgroundLayer === null || this.blockedLayer === null) throw new Error("Failed to create map layers");
        
        this.backgroundLayer.setScale(2,2);
        this.blockedLayer.setScale(2,2);
        this.blockedLayer.setCollisionByExclusion([-1]);
        this.scene.cameras.main.setBounds(0, 0, this.map.widthInPixels * 2, this.map.heightInPixels * 2);
    }
} 