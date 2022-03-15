import React, { useEffect } from 'react';

function App() {
  //@ts-ignore
  const { BMap, BMAP_STATUS_SUCCESS, BMAP_ANCHOR_TOP_LEFT,BMAP_ANCHOR_BOTTOM_LEFT } = window;
  const init_map = (BMap: any) => {
      let outputPath = '/assets/maps/';
      let minLevel = 8;
      let maxLevel = 17;
      let format = '.png';

      let tileLayer = new BMap.TileLayer();
      tileLayer.getTilesUrl = (tileCoord: any, zoom: any) => {
          let x = tileCoord.x;
          let y = tileCoord.y;
          let url = outputPath + zoom + '/' + x + '/' + y + format;
          return url;
      };
      let tileMapType = new BMap.MapType('tileMapType', tileLayer, { minZoom: minLevel, maxZoom: maxLevel,enableMapClick: true });
      let map = new BMap.Map('map', { mapType: tileMapType });
      console.log(map);

      var point = new BMap.Point(118.811746, 32.051983); // 创建点坐标
      map.centerAndZoom(point, 17); // 初始化地图，设置中心点坐标和地图级别

      map.enableScrollWheelZoom();
      map.enableInertialDragging();
      map.enableContinuousZoom();

      //添加地图类型控件
      var top_left_navigation = new BMap.NavigationControl();
  map.addControl(top_left_navigation);  

var bottom_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});// 左上角，添加比例尺

map.addControl(bottom_left_control);    
    

      //单击获取点击的经纬度
      map.addEventListener('click', function (e: any) {
          alert(e.point.lng + ',' + e.point.lat);
      });
  };
  useEffect(() => {
      init_map(BMap);
  }, []);
  return <div id="map" style={{ width: '100%', height: '70vh' }}></div>;
}

export default App;
