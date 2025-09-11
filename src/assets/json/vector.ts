export const vector_map = {
  "version": 8,
  "name": "Streets",
  "metadata": {
    "mapbox:autocomposite": true,
    "mapbox:type": "template",
    "mapbox:groups": {
      "1444849364238.8171": {
        "name": "Buildings",
        "collapsed": true
      },
      "1444849354174.1904": {
        "name": "Tunnels",
        "collapsed": true
      },
      "1444849320558.5054": {
        "name": "Water labels",
        "collapsed": true
      },
      "1444849371739.5945": {
        "name": "Aeroways",
        "collapsed": true
      },
      "1444849258897.3083": {
        "name": "Marine labels",
        "collapsed": true
      },
      "1444849388993.3071": {
        "name": "Landuse",
        "collapsed": true
      },
      "1444849242106.713": {
        "name": "Country labels",
        "collapsed": true
      },
      "1444849382550.77": {
        "name": "Water",
        "collapsed": true
      },
      "1444849345966.4436": {
        "name": "Roads",
        "collapsed": true
      },
      "1444849307123.581": {
        "name": "Admin  lines",
        "collapsed": true
      },
      "1456163609504.0715": {
        "name": "Road labels",
        "collapsed": true
      },
      "1444849272561.29": {
        "name": "Place labels",
        "collapsed": true
      },
      "1444849290021.1838": {
        "name": "Road labels",
        "collapsed": true
      },
      "1444849334699.1902": {
        "name": "Bridges",
        "collapsed": true
      },
      "1444849297111.495": {
        "name": "POI labels",
        "collapsed": true
      }
    }
  },
  "sources": {
    "locationiq": {
      "url": "https://tiles-staging.locationiq.com/v3/pbf/tiles.json?key=pk.e6c80df2d2ce1f89466be47a2a0ecd9f",
      "type": "vector"
    }
  },
  "center": [-118.2518, 34.0442],
  "zoom": 15,
  "sprite": "https://tiles-staging.locationiq.com/v3/themes/streets/sprite",
  "glyphs": "https://tiles-staging.locationiq.com/v3/pbf/fonts/{fontstack}/{range}.pbf?key=pk.e6c80df2d2ce1f89466be47a2a0ecd9f",
  "layers": [
    {
      "id": "background",
      "type": "background",
      "paint": {
        "background-color": "#f8f4f0"
      }
    },
    {
      "id": "landuse_national_park",
      "type": "fill",
      "source": "locationiq",
      "source-layer": "landuse",
      "filter": [
        "==",
        "subclass",
        "national_park"
      ],
      "paint": {
        "fill-color": "#d8e8c8",
        "fill-opacity": 0.75
      },
      "metadata": {
        "mapbox:group": "1444849388993.3071"
      }
    },
    {
      "id": "landuse_park",
      "type": "fill",
      "source": "locationiq",
      "source-layer": "landuse",
      "filter": [
        "==",
        "class",
        "park"
      ],
      "paint": {
        "fill-color": "#d8e8c8"
      },
      "metadata": {
        "mapbox:group": "1444849388993.3071"
      }
    },
    {
      "id": "landuse_wood",
      "type": "fill",
      "source": "locationiq",
      "source-layer": "landuse",
      "filter": [
        "==",
        "class",
        "wood"
      ],
      "paint": {
        "fill-color": "#d8e8c8",
        "fill-opacity": 1
      },
      "metadata": {
        "mapbox:group": "1444849388993.3071"
      }
    },
    {
      "id": "landuse_developed",
      "type": "fill",
      "source": "locationiq",
      "source-layer": "landuse",
      "filter": [
        "==",
        "class",
        "developed"
      ],
      "paint": {
        "fill-color": {
          "stops": [
            [6, "#ccc"
            ],
            [15, "#eee"
            ]
          ]
        },
        "fill-opacity": 0.3
      },
      "metadata": {
        "mapbox:group": "1444849388993.3071"
      }
    },
    {
      "id": "water_top",
      "type": "fill",
      "source": "locationiq",
      "source-layer": "water",
      "paint": {
        "fill-color": "#a0c8f0"
      },
      "metadata": {
        "mapbox:group": "1444849382550.77"
      },
      "minzoom": 2
    },
    {
      "layout": {
        "line-join": "round"
      },
      "metadata": {
        "mapbox:group": "1444849307123.581"
      },
      "filter": [
        "all",
        [
          "in",
          "admin_level",
          3, 4],
        [
          "==",
          "maritime",
          0]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "admin_level_3",
      "paint": {
        "line-color": "#9e9cab",
        "line-dasharray": [3, 1, 1, 1],
        "line-width": {
          "base": 1,
          "stops": [
            [0, 0.2]
          ]
        }
      },
      "source-layer": "admin"
    },
    {
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "metadata": {
        "mapbox:group": "1444849307123.581"
      },
      "filter": [
        "all",
        [
          "==",
          "admin_level",
          2],
        [
          "==",
          "disputed",
          0],
        [
          "==",
          "maritime",
          0]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "admin_level_2",
      "paint": {
        "line-color": "#9e9cab",
        "line-width": {
          "base": 1,
          "stops": [
            [0, 0.2],
            [5, 1]
          ]
        }
      },
      "source-layer": "admin"
    },
    {
      "layout": {
        "line-cap": "round"
      },
      "metadata": {
        "mapbox:group": "1444849307123.581"
      },
      "filter": [
        "all",
        [
          "==",
          "admin_level",
          2],
        [
          "==",
          "disputed",
          1],
        [
          "==",
          "maritime",
          0],
        [
          "in",
          "claimed_by",
          "IN,PK,CN"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "admin_level_2_disputed",
      "paint": {
        "line-color": "#9e9cab",
        "line-dasharray": [2, 2],
        "line-width": {
          "base": 1,
          "stops": [
            [4, 1.4],
            [5, 2],
            [12, 8]
          ]
        }
      },
      "source-layer": "admin"
    },
    {
      "layout": {
        "line-join": "round"
      },
      "metadata": {
        "mapbox:group": "1444849307123.581"
      },
      "filter": [
        "all",
        [
          "\u003E=",
          "admin_level",
          3],
        [
          "==",
          "maritime",
          1]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "admin_level_3_maritime",
      "paint": {
        "line-color": "#a0c8f0",
        "line-opacity": 0.5,
        "line-dasharray": [3, 1, 1, 1],
        "line-width": {
          "base": 1,
          "stops": [
            [4, 0.4],
            [5, 1],
            [12, 3]
          ]
        }
      },
      "source-layer": "admin"
    },
    {
      "layout": {
        "line-cap": "round"
      },
      "metadata": {
        "mapbox:group": "1444849307123.581"
      },
      "filter": [
        "all",
        [
          "==",
          "admin_level",
          2],
        [
          "==",
          "maritime",
          1]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "admin_level_2_maritime",
      "paint": {
        "line-color": "#a0c8f0",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1,
          "stops": [
            [4, 1.4],
            [5, 2],
            [12, 8]
          ]
        }
      },
      "source-layer": "admin"
    },
    {
      "id": "water",
      "type": "fill",
      "source": "locationiq",
      "source-layer": "water",
      "paint": {
        "fill-color": "#a0c8f0"
      },
      "metadata": {
        "mapbox:group": "1444849382550.77"
      },
      "maxzoom": 3
    },
    {
      "layout": {
        "text-font": [
          "Open Sans Italic"
        ],
        "text-field": "{name_en}",
        "text-max-width": 5,
        "text-size": 12
      },
      "metadata": {
        "mapbox:group": "1444849320558.5054"
      },
      "filter": [
        "==",
        "$type",
        "Point"
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "water_label",
      "paint": {
        "text-color": "#74aee9",
        "text-halo-width": 1.5,
        "text-halo-color": "rgba(255,255,255,0.7)"
      },
      "source-layer": "water_label"
    },
    {
      "id": "landuse_cemetery",
      "type": "fill",
      "source": "locationiq",
      "source-layer": "landuse",
      "filter": [
        "==",
        "class",
        "cemetery"
      ],
      "paint": {
        "fill-color": "#e0e4dd"
      },
      "metadata": {
        "mapbox:group": "1444849388993.3071"
      }
    },
    {
      "id": "landuse_hospital",
      "type": "fill",
      "source": "locationiq",
      "source-layer": "landuse",
      "filter": [
        "==",
        "class",
        "hospital"
      ],
      "paint": {
        "fill-color": "#fde"
      },
      "metadata": {
        "mapbox:group": "1444849388993.3071"
      }
    },
    {
      "id": "landuse_school",
      "type": "fill",
      "source": "locationiq",
      "source-layer": "landuse",
      "filter": [
        "==",
        "class",
        "school"
      ],
      "paint": {
        "fill-color": "#f0e8f8"
      },
      "metadata": {
        "mapbox:group": "1444849388993.3071"
      }
    },
    {
      "layout": {
        "line-cap": "round"
      },
      "metadata": {
        "mapbox:group": "1444849382550.77"
      },
      "filter": [
        "all",
        [
          "!=",
          "class",
          "river"
        ],
        [
          "!=",
          "class",
          "stream"
        ],
        [
          "!=",
          "class",
          "canal"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "waterway",
      "paint": {
        "line-color": "#a0c8f0",
        "line-width": {
          "base": 1.3,
          "stops": [
            [13, 0.5],
            [20, 2]
          ]
        }
      },
      "source-layer": "waterway",
      "minzoom": 5
    },
    {
      "id": "waterway_river_fill",
      "type": "fill",
      "source": "locationiq",
      "source-layer": "waterway",
      "paint": {
        "fill-color": "#a0c8f0"
      },
      "filter": [
        "all",
        [
          "==",
          "class",
          "river"
        ],
        [
          "==",
          "$type",
          "Polygon"
        ]
      ],
      "minzoom": 5
    },
    {
      "layout": {
        "line-cap": "round"
      },
      "metadata": {
        "mapbox:group": "1444849382550.77"
      },
      "filter": [
        "==",
        "class",
        "river"
      ],
      "type": "line",
      "source": "locationiq",
      "id": "waterway_river",
      "paint": {
        "line-color": "#a0c8f0",
        "line-width": {
          "base": 1.2,
          "stops": [
            [11, 0.5],
            [20, 6]
          ]
        }
      },
      "source-layer": "waterway",
      "minzoom": 5
    },
    {
      "layout": {
        "line-cap": "round"
      },
      "metadata": {
        "mapbox:group": "1444849382550.77"
      },
      "filter": [
        "in",
        "class",
        "stream",
        "canal"
      ],
      "type": "line",
      "source": "locationiq",
      "id": "waterway_stream_canal",
      "paint": {
        "line-color": "#a0c8f0",
        "line-width": {
          "base": 1.3,
          "stops": [
            [13, 0.5],
            [20, 6]
          ]
        }
      },
      "source-layer": "waterway",
      "minzoom": 9
    },
    {
      "id": "waterway_stream_canal_polygon",
      "type": "fill",
      "source": "locationiq",
      "source-layer": "waterway",
      "paint": {
        "fill-color": "#a0c8f0"
      },
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Polygon"
        ]
      ],
      "minzoom": 9
    },
    {
      "minzoom": 9,
      "metadata": {
        "mapbox:group": "1444849371739.5945"
      },
      "filter": [
        "==",
        "$type",
        "Polygon"
      ],
      "type": "fill",
      "source": "locationiq",
      "id": "aeroway_fill",
      "paint": {
        "fill-color": "#eee",
        "fill-opacity": 1
      },
      "source-layer": "aeroway"
    },
    {
      "id": "waterway_label",
      "type": "symbol",
      "source": "locationiq",
      "source-layer": "waterway",
      "layout": {
        "text-field": "{name}",
        "symbol-placement": "line-center",
        "text-size": {
          "stops": [
            [13, 12],
            [14, 13]
          ]
        }
      },
      "minzoom": 5,
      "filter": [
        "all",
        [
          "in",
          "class",
          "river",
          "stream",
          "canal"
        ]
      ],
      "paint": {
        "text-color": "#4588CF",
        "text-halo-blur": 0.5,
        "text-halo-color": "#ffffff",
        "text-halo-width": 1
      }
    },
    {
      "minzoom": 11,
      "metadata": {
        "mapbox:group": "1444849371739.5945"
      },
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "==",
          "class",
          "runway"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "aeroway_runway",
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.2,
          "stops": [
            [11, 1.5],
            [20, 16]
          ]
        }
      },
      "source-layer": "aeroway"
    },
    {
      "minzoom": 11,
      "metadata": {
        "mapbox:group": "1444849371739.5945"
      },
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "==",
          "class",
          "taxiway"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "aeroway_taxiway",
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.2,
          "stops": [
            [11, 0.5],
            [20, 6]
          ]
        }
      },
      "source-layer": "aeroway"
    },
    {
      "id": "building",
      "type": "fill",
      "source": "locationiq",
      "source-layer": "building",
      "paint": {
        "fill-color": {
          "base": 1,
          "stops": [
            [15.5, "#f2eae2"
            ],
            [16, "#dfdbd7"
            ]
          ]
        }
      },
      "metadata": {
        "mapbox:group": "1444849364238.8171"
      }
    },
    {
      "id": "building_top",
      "paint": {
        "fill-color": "#f2eae2",
        "fill-opacity": {
          "base": 1,
          "stops": [
            [15, 0],
            [16, 1]
          ]
        },
        "fill-translate": {
          "stops": [
            [15, [0, 0]
            ],
            [16, [-2, -2]
            ]
          ],
          "base": 1
        },
        "fill-outline-color": "#dfdbd7"
      },
      "metadata": {
        "mapbox:group": "1444849364238.8171"
      },
      "ref": "building"
    },
    {
      "layout": {
        "line-join": "round",
        "visibility": "visible"
      },
      "metadata": {
        "mapbox:group": "1444849354174.1904"
      },
      "filter": [
        "all",
        [
          "==",
          "structure",
          "tunnel"
        ],
        [
          "in",
          "class",
          "motorway_link",
          "trunk_link"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "tunnel_motorway_link_casing",
      "paint": {
        "line-color": "#e9ac77",
        "line-dasharray": [0.5, 0.25],
        "line-width": {
          "base": 1.2,
          "stops": [
            [12, 1],
            [13, 3],
            [14, 4],
            [20, 15]
          ]
        },
        "line-opacity": 1
      },
      "source-layer": "road"
    },
    {
      "layout": {
        "line-join": "round"
      },
      "metadata": {
        "mapbox:group": "1444849354174.1904"
      },
      "filter": [
        "all",
        [
          "==",
          "structure",
          "tunnel"
        ],
        [
          "in",
          "class",
          "service",
          "track",
          "living_street"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "tunnel_service_track_casing",
      "paint": {
        "line-color": "#ccc",
        "line-dasharray": [0.5, 0.25],
        "line-width": {
          "base": 1.2,
          "stops": [
            [15, 1],
            [16, 4],
            [20, 11]
          ]
        }
      },
      "source-layer": "road"
    },
    {
      "layout": {
        "line-join": "round"
      },
      "metadata": {
        "mapbox:group": "1444849354174.1904"
      },
      "filter": [
        "all",
        [
          "==",
          "structure",
          "tunnel"
        ],
        [
          "==",
          "class",
          "link"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "tunnel_link_casing",
      "paint": {
        "line-color": "#e9ac77",
        "line-width": {
          "base": 1.2,
          "stops": [
            [12, 1],
            [13, 3],
            [14, 4],
            [20, 15]
          ]
        },
        "line-opacity": 1
      },
      "source-layer": "road"
    },
    {
      "layout": {
        "line-join": "round"
      },
      "metadata": {
        "mapbox:group": "1444849354174.1904"
      },
      "filter": [
        "all",
        [
          "==",
          "structure",
          "tunnel"
        ],
        [
          "in",
          "class",
          "street",
          "street_limited",
          "minor",
          "residential",
          "unclassified"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "tunnel_street_casing",
      "paint": {
        "line-color": "#ccc",
        "line-width": {
          "base": 1.2,
          "stops": [
            [12, 0.5],
            [13, 1],
            [14, 4],
            [20, 15]
          ]
        },
        "line-opacity": {
          "stops": [
            [12, 0],
            [12.5, 1]
          ]
        },
        "line-dasharray": [0.5, 0.25]
      },
      "source-layer": "road"
    },
    {
      "layout": {
        "line-join": "round"
      },
      "metadata": {
        "mapbox:group": "1444849354174.1904"
      },
      "filter": [
        "all",
        [
          "==",
          "structure",
          "tunnel"
        ],
        [
          "in",
          "class",
          "secondary",
          "tertiary"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "tunnel_secondary_tertiary_casing",
      "paint": {
        "line-color": "#ccc",
        "line-width": {
          "base": 1.2,
          "stops": [
            [8, 1.5],
            [20, 17]
          ]
        },
        "line-opacity": 1
      },
      "source-layer": "road"
    },
    {
      "layout": {
        "line-join": "round"
      },
      "metadata": {
        "mapbox:group": "1444849354174.1904"
      },
      "filter": [
        "all",
        [
          "==",
          "structure",
          "tunnel"
        ],
        [
          "in",
          "class",
          "trunk",
          "trunk_link"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "tunnel_trunk_casing",
      "paint": {
        "line-color": "#e9ac77",
        "line-width": {
          "base": 1.2,
          "stops": [
            [5, 0.4],
            [6, 0.6],
            [7, 1.5],
            [20, 22]
          ]
        }
      },
      "source-layer": "road"
    },
    {
      "layout": {
        "line-join": "round"
      },
      "metadata": {
        "mapbox:group": "1444849354174.1904"
      },
      "filter": [
        "all",
        [
          "==",
          "structure",
          "tunnel"
        ],
        [
          "in",
          "class",
          "primary",
          "primary_link"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "tunnel_primary_casing",
      "paint": {
        "line-color": "#ccc",
        "line-width": {
          "base": 1.2,
          "stops": [
            [5, 0.4],
            [6, 0.6],
            [7, 1.5],
            [20, 22]
          ]
        }
      },
      "source-layer": "road"
    },
    {
      "layout": {
        "line-join": "round",
        "visibility": "visible"
      },
      "metadata": {
        "mapbox:group": "1444849354174.1904"
      },
      "filter": [
        "all",
        [
          "==",
          "structure",
          "tunnel"
        ],
        [
          "==",
          "class",
          "motorway"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "tunnel_motorway_casing",
      "paint": {
        "line-color": "#e9ac77",
        "line-dasharray": [0.5, 0.25],
        "line-width": {
          "base": 1.2,
          "stops": [
            [5, 0.4],
            [6, 0.6],
            [7, 1.5],
            [20, 22]
          ]
        }
      },
      "source-layer": "road"
    },
    {
      "id": "tunnel_path_pedestrian",
      "type": "line",
      "source": "locationiq",
      "source-layer": "road",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "structure",
            "tunnel"
          ],
          [
            "in",
            "class",
            "path",
            "pedestrian"
          ]
        ]
      ],
      "paint": {
        "line-color": "#cba",
        "line-dasharray": [1.5, 0.75],
        "line-width": {
          "base": 1.2,
          "stops": [
            [15, 1.2],
            [20, 4]
          ]
        }
      },
      "metadata": {
        "mapbox:group": "1444849354174.1904"
      }
    },
    {
      "metadata": {
        "mapbox:group": "1444849354174.1904"
      },
      "id": "tunnel_motorway_link",
      "paint": {
        "line-color": "#fc8",
        "line-width": {
          "base": 1.2,
          "stops": [
            [12.5, 0],
            [13, 1.5],
            [14, 2.5],
            [20, 11.5]
          ]
        }
      },
      "ref": "tunnel_motorway_link_casing"
    },
    {
      "metadata": {
        "mapbox:group": "1444849354174.1904"
      },
      "id": "tunnel_service_track",
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.2,
          "stops": [
            [15.5, 0],
            [16, 2],
            [20, 7.5]
          ]
        }
      },
      "ref": "tunnel_service_track_casing"
    },
    {
      "metadata": {
        "mapbox:group": "1444849354174.1904"
      },
      "id": "tunnel_link",
      "paint": {
        "line-color": "#fff4c6",
        "line-width": {
          "base": 1.2,
          "stops": [
            [12.5, 0],
            [13, 1.5],
            [14, 2.5],
            [20, 11.5]
          ]
        }
      },
      "ref": "tunnel_link_casing"
    },
    {
      "metadata": {
        "mapbox:group": "1444849354174.1904"
      },
      "id": "tunnel_street",
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.2,
          "stops": [
            [13.5, 0],
            [14, 2.5],
            [20, 11.5]
          ]
        },
        "line-opacity": 1
      },
      "ref": "tunnel_street_casing"
    },
    {
      "metadata": {
        "mapbox:group": "1444849354174.1904"
      },
      "id": "tunnel_secondary_tertiary",
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.2,
          "stops": [
            [6.5, 0],
            [7, 0.5],
            [20, 10]
          ]
        }
      },
      "ref": "tunnel_secondary_tertiary_casing"
    },
    {
      "metadata": {
        "mapbox:group": "1444849354174.1904"
      },
      "id": "tunnel_trunk",
      "paint": {
        "line-color": "#ffeeaa",
        "line-width": {
          "base": 1.2,
          "stops": [
            [6.5, 0],
            [7, 0.5],
            [20, 18]
          ]
        }
      },
      "ref": "tunnel_trunk_casing"
    },
    {
      "metadata": {
        "mapbox:group": "1444849354174.1904"
      },
      "id": "tunnel_primary",
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.2,
          "stops": [
            [6.5, 0],
            [7, 0.5],
            [20, 18]
          ]
        }
      },
      "ref": "tunnel_primary_casing"
    },
    {
      "metadata": {
        "mapbox:group": "1444849354174.1904"
      },
      "id": "tunnel_motorway",
      "paint": {
        "line-color": "#ffdaa6",
        "line-width": {
          "base": 1.2,
          "stops": [
            [6.5, 0],
            [7, 0.5],
            [20, 18]
          ]
        }
      },
      "ref": "tunnel_motorway_casing"
    },
    {
      "id": "tunnel_major_rail",
      "type": "line",
      "source": "locationiq",
      "source-layer": "road",
      "filter": [
        "all",
        [
          "==",
          "structure",
          "tunnel"
        ],
        [
          "in",
          "class",
          "rail",
          "subway"
        ]
      ],
      "paint": {
        "line-color": "#bbb",
        "line-width": {
          "base": 1.4,
          "stops": [
            [14, 0.4],
            [15, 0.75],
            [20, 2]
          ]
        }
      },
      "metadata": {
        "mapbox:group": "1444849354174.1904"
      }
    },
    {
      "id": "tunnel_major_rail_hatching",
      "paint": {
        "line-color": "#bbb",
        "line-dasharray": [0.2, 8],
        "line-width": {
          "base": 1.4,
          "stops": [
            [14.5, 0],
            [15, 3],
            [20, 8]
          ]
        }
      },
      "metadata": {
        "mapbox:group": "1444849354174.1904"
      },
      "ref": "tunnel_major_rail"
    },
    {
      "minzoom": 12,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "filter": [
        "all",
        [
          "in",
          "class",
          "motorway_link",
          "trunk_link"
        ],
        [
          "!in",
          "structure",
          "bridge",
          "tunnel"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "road_motorway_link_casing",
      "paint": {
        "line-color": "#e9ac77",
        "line-width": {
          "base": 1.2,
          "stops": [
            [12, 1],
            [13, 3],
            [14, 4],
            [20, 15]
          ]
        },
        "line-opacity": 1
      },
      "source-layer": "road"
    },
    {
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "filter": [
        "all",
        [
          "in",
          "class",
          "service",
          "track",
          "living_street"
        ],
        [
          "!in",
          "structure",
          "bridge",
          "tunnel"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "road_service_track_casing",
      "paint": {
        "line-color": "#ccc",
        "line-width": {
          "base": 1.2,
          "stops": [
            [12, 0.5],
            [16, 5],
            [20, 17]
          ]
        }
      },
      "source-layer": "road",
      "minzoom": 11
    },
    {
      "minzoom": 11,
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "filter": [
        "all",
        [
          "==",
          "class",
          "link"
        ],
        [
          "!in",
          "structure",
          "bridge",
          "tunnel"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "road_link_casing",
      "paint": {
        "line-color": "#e9ac77",
        "line-width": {
          "base": 1.2,
          "stops": [
            [12, 1],
            [13, 3],
            [14, 4],
            [20, 15]
          ]
        },
        "line-opacity": 1
      },
      "source-layer": "road"
    },
    {
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "in",
            "class",
            "street",
            "street_limited",
            "minor",
            "residential",
            "unclassified"
          ],
          [
            "!in",
            "structure",
            "bridge",
            "tunnel"
          ]
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "road_street_casing",
      "paint": {
        "line-color": "#ccc",
        "line-width": {
          "base": 1.2,
          "stops": [
            [12, 0.5],
            [13, 1],
            [14, 4],
            [20, 15]
          ]
        },
        "line-opacity": {
          "stops": [
            [12, 0],
            [12.5, 1]
          ]
        }
      },
      "source-layer": "road"
    },
    {
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "filter": [
        "all",
        [
          "in",
          "class",
          "secondary",
          "tertiary"
        ],
        [
          "!in",
          "structure",
          "bridge",
          "tunnel"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "road_secondary_tertiary_casing",
      "paint": {
        "line-color": "#ccc",
        "line-width": {
          "base": 1.2,
          "stops": [
            [8, 1.5],
            [20, 17]
          ]
        },
        "line-opacity": 1
      },
      "source-layer": "road"
    },
    {
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "filter": [
        "all",
        [
          "in",
          "class",
          "residential",
          "unclassified"
        ],
        [
          "!in",
          "structure",
          "bridge",
          "tunnel"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "road_residential_casing",
      "paint": {
        "line-color": "#ccc",
        "line-width": [
          "interpolate",
          [
            "exponential",
            2],
          [
            "zoom"
          ],
          12, 1, 16, 9]
      },
      "minzoom": 11,
      "source-layer": "road"
    },
    {
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "filter": [
        "all",
        [
          "in",
          "class",
          "residential",
          "unclassified"
        ],
        [
          "!in",
          "structure",
          "bridge",
          "tunnel"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "road_residential",
      "paint": {
        "line-color": "#fff",
        "line-width": [
          "interpolate",
          [
            "exponential",
            2],
          [
            "zoom"
          ],
          12.5, 0.1, 16, 8],
        "line-opacity": 1
      },
      "minzoom": 11,
      "source-layer": "road"
    },
    {
      "id": "road_path",
      "type": "line",
      "source": "locationiq",
      "source-layer": "road",
      "filter": [
        "all",
        [
          "in",
          "class",
          "path",
          "footway"
        ]
      ],
      "paint": {
        "line-dasharray": [1.5, 1.5],
        "line-color": "rgba(207, 205, 202, 1)",
        "line-width": {
          "stops": [
            [6, 0.5],
            [10, 1.5]
          ]
        }
      },
      "minzoom": 14
    },
    {
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "filter": [
        "all",
        [
          "in",
          "class",
          "trunk",
          "trunk_link"
        ],
        [
          "!in",
          "structure",
          "bridge",
          "tunnel"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "road_trunk_casing",
      "paint": {
        "line-color": "#e9ac77",
        "line-width": {
          "base": 1.2,
          "stops": [
            [5, 0.4],
            [6, 0.6],
            [7, 1.5],
            [20, 22]
          ]
        },
        "line-opacity": 1
      },
      "source-layer": "road"
    },
    {
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "filter": [
        "all",
        [
          "in",
          "class",
          "primary",
          "primary_link"
        ],
        [
          "!in",
          "structure",
          "bridge",
          "tunnel"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "road_primary_casing",
      "paint": {
        "line-color": "#ccc",
        "line-width": {
          "base": 1.2,
          "stops": [
            [5, 0.4],
            [6, 0.6],
            [7, 1.5],
            [20, 22]
          ]
        },
        "line-opacity": 1
      },
      "source-layer": "road"
    },
    {
      "minzoom": 5,
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "filter": [
        "all",
        [
          "==",
          "class",
          "motorway"
        ],
        [
          "!in",
          "structure",
          "bridge",
          "tunnel"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "road_motorway_casing",
      "paint": {
        "line-color": "#e9ac77",
        "line-width": {
          "base": 1.2,
          "stops": [
            [5, 0.4],
            [6, 0.6],
            [7, 1.5],
            [20, 22]
          ]
        }
      },
      "source-layer": "road"
    },
    {
      "id": "road_path_pedestrian",
      "type": "line",
      "source": "locationiq",
      "source-layer": "road",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "in",
            "class",
            "path",
            "pedestrian"
          ],
          [
            "!in",
            "structure",
            "bridge",
            "tunnel"
          ]
        ]
      ],
      "paint": {
        "line-color": "#cba",
        "line-dasharray": [1.5, 0.75],
        "line-width": {
          "base": 1.2,
          "stops": [
            [15, 1.2],
            [20, 4]
          ]
        }
      },
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "minzoom": 14
    },
    {
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "id": "road_motorway_link",
      "paint": {
        "line-color": "#fc8",
        "line-width": {
          "base": 1.2,
          "stops": [
            [12.5, 0],
            [13, 1.5],
            [14, 2.5],
            [20, 11.5]
          ]
        }
      },
      "ref": "road_motorway_link_casing"
    },
    {
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "id": "road_service_track",
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.2,
          "stops": [
            [12.5, 0.5],
            [16, 4],
            [20, 16]
          ]
        }
      },
      "ref": "road_service_track_casing",
      "minzoom": 11
    },
    {
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "id": "road_link",
      "paint": {
        "line-color": "#fea",
        "line-width": {
          "base": 1.2,
          "stops": [
            [12.5, 0],
            [13, 1.5],
            [14, 2.5],
            [20, 11.5]
          ]
        }
      },
      "ref": "road_link_casing"
    },
    {
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "id": "road_street",
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.2,
          "stops": [
            [13.5, 0],
            [14, 2.5],
            [20, 11.5]
          ]
        },
        "line-opacity": 1
      },
      "ref": "road_street_casing"
    },
    {
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "id": "road_secondary_tertiary",
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.2,
          "stops": [
            [6.5, 0],
            [8, 0.5],
            [20, 13]
          ]
        }
      },
      "ref": "road_secondary_tertiary_casing"
    },
    {
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "id": "road_trunk",
      "paint": {
        "line-color": "#ffeeaa",
        "line-width": {
          "base": 1.2,
          "stops": [
            [6.5, 0],
            [7, 0.5],
            [20, 18]
          ]
        }
      },
      "ref": "road_trunk_casing"
    },
    {
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "id": "road_primary",
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.2,
          "stops": [
            [6.5, 0],
            [7, 0.5],
            [20, 18]
          ]
        }
      },
      "ref": "road_primary_casing"
    },
    {
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "id": "road_motorway",
      "paint": {
        "line-color": "#fc8",
        "line-width": {
          "base": 1.2,
          "stops": [
            [6.5, 0],
            [7, 0.5],
            [20, 18]
          ]
        }
      },
      "ref": "road_motorway_casing"
    },
    {
      "id": "road_major_rail",
      "type": "line",
      "source": "locationiq",
      "source-layer": "road",
      "filter": [
        "all",
        [
          "in",
          "class",
          "rail",
          "subway"
        ],
        [
          "!in",
          "structure",
          "bridge",
          "tunnel"
        ]
      ],
      "paint": {
        "line-color": "#bbb",
        "line-width": {
          "base": 1.4,
          "stops": [
            [14, 0.4],
            [15, 0.75],
            [20, 2]
          ]
        }
      },
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      }
    },
    {
      "id": "road_major_rail_hatching",
      "paint": {
        "line-color": "#bbb",
        "line-dasharray": [0.2, 8],
        "line-width": {
          "base": 1.4,
          "stops": [
            [14.5, 0],
            [15, 3],
            [20, 8]
          ]
        }
      },
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "ref": "road_major_rail"
    },
    {
      "layout": {
        "line-join": "round"
      },
      "metadata": {
        "mapbox:group": "1444849334699.1902"
      },
      "filter": [
        "all",
        [
          "==",
          "structure",
          "bridge"
        ],
        [
          "in",
          "class",
          "motorway_link",
          "trunk_link"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "bridge_motorway_link_casing",
      "paint": {
        "line-color": "#e9ac77",
        "line-width": {
          "base": 1.2,
          "stops": [
            [12, 1],
            [13, 3],
            [14, 4],
            [20, 15]
          ]
        },
        "line-opacity": 1
      },
      "source-layer": "road"
    },
    {
      "layout": {
        "line-join": "round"
      },
      "metadata": {
        "mapbox:group": "1444849334699.1902"
      },
      "filter": [
        "all",
        [
          "==",
          "structure",
          "bridge"
        ],
        [
          "in",
          "class",
          "service",
          "track",
          "living_street"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "bridge_service_track_casing",
      "paint": {
        "line-color": "#ccc",
        "line-width": {
          "base": 1.2,
          "stops": [
            [15, 1],
            [16, 4],
            [20, 11]
          ]
        }
      },
      "source-layer": "road",
      "minzoom": 13
    },
    {
      "layout": {
        "line-join": "round"
      },
      "metadata": {
        "mapbox:group": "1444849334699.1902"
      },
      "filter": [
        "all",
        [
          "==",
          "structure",
          "bridge"
        ],
        [
          "==",
          "class",
          "link"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "bridge_link_casing",
      "paint": {
        "line-color": "#e9ac77",
        "line-width": {
          "base": 1.2,
          "stops": [
            [12, 1],
            [13, 3],
            [14, 4],
            [20, 15]
          ]
        },
        "line-opacity": 1
      },
      "source-layer": "road"
    },
    {
      "layout": {
        "line-join": "round"
      },
      "metadata": {
        "mapbox:group": "1444849334699.1902"
      },
      "filter": [
        "all",
        [
          "==",
          "structure",
          "bridge"
        ],
        [
          "in",
          "class",
          "street",
          "street_limited",
          "minor",
          "residential",
          "unclassified"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "bridge_street_casing",
      "paint": {
        "line-color": "#ccc",
        "line-width": {
          "base": 1.2,
          "stops": [
            [12, 0.5],
            [13, 1],
            [14, 4],
            [20, 15]
          ]
        },
        "line-opacity": {
          "stops": [
            [12, 0],
            [12.5, 1]
          ]
        }
      },
      "source-layer": "road"
    },
    {
      "layout": {
        "line-join": "round"
      },
      "metadata": {
        "mapbox:group": "1444849334699.1902"
      },
      "filter": [
        "all",
        [
          "==",
          "structure",
          "bridge"
        ],
        [
          "in",
          "class",
          "secondary",
          "tertiary"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "bridge_secondary_tertiary_casing",
      "paint": {
        "line-color": "#ccc",
        "line-width": {
          "base": 1.2,
          "stops": [
            [8, 1.5],
            [20, 17]
          ]
        },
        "line-opacity": 1
      },
      "source-layer": "road"
    },
    {
      "layout": {
        "line-join": "round"
      },
      "metadata": {
        "mapbox:group": "1444849334699.1902"
      },
      "filter": [
        "all",
        [
          "==",
          "structure",
          "bridge"
        ],
        [
          "in",
          "class",
          "trunk",
          "trunk_link"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "bridge_trunk_casing",
      "paint": {
        "line-color": "#e9ac77",
        "line-width": {
          "base": 1.2,
          "stops": [
            [5, 0.4],
            [6, 0.6],
            [7, 1.5],
            [20, 22]
          ]
        }
      },
      "source-layer": "road"
    },
    {
      "layout": {
        "line-join": "round"
      },
      "metadata": {
        "mapbox:group": "1444849334699.1902"
      },
      "filter": [
        "all",
        [
          "==",
          "structure",
          "bridge"
        ],
        [
          "in",
          "class",
          "primary",
          "primary_link"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "bridge_primary_casing",
      "paint": {
        "line-color": "#ccc",
        "line-width": {
          "base": 1.2,
          "stops": [
            [5, 0.4],
            [6, 0.6],
            [7, 1.5],
            [20, 22]
          ]
        }
      },
      "source-layer": "road"
    },
    {
      "layout": {
        "line-join": "round"
      },
      "metadata": {
        "mapbox:group": "1444849334699.1902"
      },
      "filter": [
        "all",
        [
          "==",
          "structure",
          "bridge"
        ],
        [
          "==",
          "class",
          "motorway"
        ]
      ],
      "type": "line",
      "source": "locationiq",
      "id": "bridge_motorway_casing",
      "paint": {
        "line-color": "#e9ac77",
        "line-width": {
          "base": 1.2,
          "stops": [
            [5, 0.4],
            [6, 0.6],
            [7, 1.5],
            [20, 22]
          ]
        }
      },
      "source-layer": "road"
    },
    {
      "id": "bridge_path_pedestrian",
      "type": "line",
      "source": "locationiq",
      "source-layer": "road",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "structure",
            "bridge"
          ],
          [
            "in",
            "class",
            "path",
            "pedestrian"
          ]
        ]
      ],
      "paint": {
        "line-color": "#cba",
        "line-dasharray": [1.5, 0.75],
        "line-width": {
          "base": 1.2,
          "stops": [
            [15, 1.2],
            [20, 4]
          ]
        }
      },
      "metadata": {
        "mapbox:group": "1444849334699.1902"
      }
    },
    {
      "metadata": {
        "mapbox:group": "1444849334699.1902"
      },
      "id": "bridge_motorway_link",
      "paint": {
        "line-color": "#fc8",
        "line-width": {
          "base": 1.2,
          "stops": [
            [12.5, 0],
            [13, 1.5],
            [14, 2.5],
            [20, 11.5]
          ]
        }
      },
      "ref": "bridge_motorway_link_casing"
    },
    {
      "metadata": {
        "mapbox:group": "1444849334699.1902"
      },
      "id": "bridge_service_track",
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.2,
          "stops": [
            [15.5, 0],
            [16, 2],
            [20, 7.5]
          ]
        }
      },
      "ref": "bridge_service_track_casing",
      "minzoom": 13
    },
    {
      "metadata": {
        "mapbox:group": "1444849334699.1902"
      },
      "id": "bridge_link",
      "paint": {
        "line-color": "#fea",
        "line-width": {
          "base": 1.2,
          "stops": [
            [12.5, 0],
            [13, 1.5],
            [14, 2.5],
            [20, 11.5]
          ]
        }
      },
      "ref": "bridge_link_casing"
    },
    {
      "metadata": {
        "mapbox:group": "1444849334699.1902"
      },
      "id": "bridge_street",
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.2,
          "stops": [
            [13.5, 0],
            [14, 2.5],
            [20, 11.5]
          ]
        },
        "line-opacity": 1
      },
      "ref": "bridge_street_casing"
    },
    {
      "metadata": {
        "mapbox:group": "1444849334699.1902"
      },
      "id": "bridge_secondary_tertiary",
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.2,
          "stops": [
            [6.5, 0],
            [7, 0.5],
            [20, 10]
          ]
        }
      },
      "ref": "bridge_secondary_tertiary_casing"
    },
    {
      "metadata": {
        "mapbox:group": "1444849334699.1902"
      },
      "id": "bridge_trunk",
      "paint": {
        "line-color": "#ffeeaa",
        "line-width": {
          "base": 1.2,
          "stops": [
            [6.5, 0],
            [7, 0.5],
            [20, 18]
          ]
        }
      },
      "ref": "bridge_trunk_casing"
    },
    {
      "metadata": {
        "mapbox:group": "1444849334699.1902"
      },
      "id": "bridge_primary",
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.2,
          "stops": [
            [6.5, 0],
            [7, 0.5],
            [20, 18]
          ]
        }
      },
      "ref": "bridge_primary_casing"
    },
    {
      "metadata": {
        "mapbox:group": "1444849334699.1902"
      },
      "id": "bridge_motorway",
      "paint": {
        "line-color": "#fc8",
        "line-width": {
          "base": 1.2,
          "stops": [
            [6.5, 0],
            [7, 0.5],
            [20, 18]
          ]
        }
      },
      "ref": "bridge_motorway_casing"
    },
    {
      "id": "bridge_major_rail",
      "type": "line",
      "source": "locationiq",
      "source-layer": "road",
      "filter": [
        "all",
        [
          "==",
          "structure",
          "bridge"
        ],
        [
          "in",
          "class",
          "rail",
          "subway"
        ]
      ],
      "paint": {
        "line-color": "#bbb",
        "line-width": {
          "base": 1.4,
          "stops": [
            [14, 0.4],
            [15, 0.75],
            [20, 2]
          ]
        }
      },
      "metadata": {
        "mapbox:group": "1444849334699.1902"
      }
    },
    {
      "id": "bridge_major_rail_hatching",
      "paint": {
        "line-color": "#bbb",
        "line-dasharray": [0.2, 8],
        "line-width": {
          "base": 1.4,
          "stops": [
            [14.5, 0],
            [15, 3],
            [20, 8]
          ]
        }
      },
      "metadata": {
        "mapbox:group": "1444849334699.1902"
      },
      "ref": "bridge_major_rail"
    },
    {
      "layout": {
        "icon-image": "{class}-11",
        "visibility": "visible"
      },
      "metadata": {
        "mapbox:group": "1444849297111.495"
      },
      "type": "symbol",
      "source": "locationiq",
      "id": "transit_stop_label_1",
      "minzoom": 15,
      "source-layer": "transit_stop_label"
    },
    {
      "layout": {
        "text-size": 12,
        "icon-image": "{class}-11",
        "text-font": [
          "Open Sans Semibold"
        ],
        "text-padding": 2,
        "visibility": "visible",
        "text-offset": [0, 0.6],
        "text-anchor": "top",
        "text-field": "{name_en}",
        "text-max-width": 9
      },
      "metadata": {
        "mapbox:group": "1444849297111.495"
      },
      "type": "symbol",
      "source": "locationiq",
      "id": "transit_stop_label",
      "paint": {
        "text-color": "#666",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
        "text-halo-blur": 0.5
      },
      "minzoom": 15,
      "source-layer": "transit_stop_label"
    },
    {
      "minzoom": 14,
      "layout": {
        "icon-image": "{class}-11"
      },
      "metadata": {
        "mapbox:group": "1444849297111.495"
      },
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "in",
          "class",
          "fuel"
        ]
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "poi_label_1",
      "paint": {
        "text-color": "#666",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
        "text-halo-blur": 0.5
      },
      "source-layer": "poi_label"
    },
    {
      "minzoom": 15,
      "layout": {
        "icon-image": "{class}-11",
        "text-font": [
          "Open Sans Semibold"
        ],
        "text-field": "{name_en}",
        "text-max-width": 9,
        "text-padding": 2,
        "text-offset": [0, 0.6],
        "text-anchor": "top",
        "text-size": 12
      },
      "metadata": {
        "mapbox:group": "1444849297111.495"
      },
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ]
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "poi_label_2",
      "paint": {
        "text-color": "#666",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
        "text-halo-blur": 0.5
      },
      "source-layer": "poi_label"
    },
    {
      "minzoom": 9,
      "layout": {
        "icon-image": "airport-11"
      },
      "metadata": {
        "mapbox:group": "1444849297111.495"
      },
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "rank",
          1]
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "airport_label",
      "source-layer": "airport_label"
    },
    {
      "minzoom": 10,
      "layout": {
        "icon-image": "airport-11",
        "text-font": [
          "Open Sans Semibold"
        ],
        "text-field": "{name_en}",
        "text-max-width": 9,
        "text-padding": 2,
        "text-offset": [0, 0.6],
        "text-anchor": "top",
        "text-size": 12
      },
      "metadata": {
        "mapbox:group": "1444849297111.495"
      },
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "in",
          "rank",
          1, 2]
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "airport_label_2",
      "paint": {
        "text-color": "#666",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
        "text-halo-blur": 0.5
      },
      "source-layer": "airport_label"
    },
    {
      "layout": {
        "text-field": "{name_en}",
        "text-font": [
          "Open Sans Regular"
        ],
        "text-size": {
          "base": 1,
          "stops": [
            [13, 12],
            [14, 13]
          ]
        },
        "symbol-placement": "line-center"
      },
      "metadata": {
        "mapbox:group": "1456163609504.0715"
      },
      "filter": [
        "!in",
        "class",
        "ferry",
        "bus"
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "road_label",
      "paint": {
        "text-color": "#765",
        "text-halo-width": 1,
        "text-halo-blur": 0.5
      },
      "source-layer": "road"
    },
    {
      "minzoom": 8,
      "layout": {
        "text-field": "{ref}",
        "text-font": [
          "Open Sans Semibold"
        ],
        "text-size": 11,
        "icon-image": "motorway_{reflen}",
        "symbol-placement": "line",
        "symbol-spacing": 500,
        "text-rotation-alignment": "viewport",
        "icon-rotation-alignment": "viewport"
      },
      "metadata": {
        "mapbox:group": "1456163609504.0715"
      },
      "filter": [
        "all",
        [
          "\u003C=",
          "reflen",
          6],
        [
          "in",
          "class",
          "highway",
          "trunk",
          "motorway"
        ]
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "road_label_highway_shield",
      "paint": {

      },
      "source-layer": "road"
    },
    {
      "layout": {
        "text-font": [
          "Open Sans Bold"
        ],
        "text-transform": "uppercase",
        "text-letter-spacing": 0.1,
        "text-field": "{name_en}",
        "text-max-width": 9,
        "text-size": 12
      },
      "metadata": {
        "mapbox:group": "1444849272561.29"
      },
      "filter": [
        "in",
        "class",
        "suburb",
        "island",
        "islet"
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "place_label_suburb",
      "paint": {
        "text-color": "#633",
        "text-halo-color": "rgba(255,255,255,0.8)",
        "text-halo-width": 1.2
      },
      "source-layer": "place_label"
    },
    {
      "layout": {
        "text-font": [
          "Open Sans Regular"
        ],
        "text-field": "{name_en}",
        "text-max-width": 8,
        "text-size": 12,
        "symbol-avoid-edges": true
      },
      "metadata": {
        "mapbox:group": "1444849272561.29"
      },
      "filter": [
        "==",
        "class",
        "hamlet"
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "place_label_hamlet",
      "paint": {
        "text-color": "#333",
        "text-halo-color": "rgba(255,255,255,0.8)",
        "text-halo-width": 1.2
      },
      "minzoom": 12,
      "source-layer": "place_label"
    },
    {
      "layout": {
        "text-font": [
          "Open Sans Regular"
        ],
        "text-field": "{name_en}",
        "text-max-width": 8,
        "text-size": 12,
        "symbol-avoid-edges": true
      },
      "metadata": {
        "mapbox:group": "1444849272561.29"
      },
      "filter": [
        "==",
        "class",
        "village"
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "place_label_village",
      "paint": {
        "text-color": "#333",
        "text-halo-color": "rgba(255,255,255,0.8)",
        "text-halo-width": 1.2
      },
      "source-layer": "place_label"
    },
    {
      "layout": {
        "text-font": [
          "Open Sans Regular"
        ],
        "text-field": "{name_en}",
        "text-max-width": 12,
        "text-size": 12,
        "text-padding": {
          "stops": [
            [6, 18],
            [8, 12],
            [10, 2]
          ]
        },
        "symbol-avoid-edges": true,
        "symbol-sort-key": [
          "get",
          "rank"
        ]
      },
      "metadata": {
        "mapbox:group": "1444849272561.29"
      },
      "filter": [
        "==",
        "class",
        "town"
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "place_label_town",
      "paint": {
        "text-color": "#333",
        "text-halo-color": "rgba(255,255,255,0.8)",
        "text-halo-width": 1.2
      },
      "source-layer": "place_label"
    },
    {
      "layout": {
        "text-font": [
          "Open Sans SemiBold"
        ],
        "text-field": "{name_en}",
        "text-size": {
          "stops": [
            [6, 12],
            [10, 14]
          ]
        },
        "text-max-width": 8,
        "symbol-avoid-edges": true,
        "symbol-sort-key": [
          "get",
          "rank"
        ]
      },
      "metadata": {
        "mapbox:group": "1444849272561.29"
      },
      "filter": [
        "all",
        [
          "==",
          "class",
          "city"
        ]
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "place_label_city",
      "paint": {
        "text-color": "#333",
        "text-halo-color": "rgba(255,255,255,0.8)",
        "text-halo-width": 1.2
      },
      "minzoom": 6,
      "maxzoom": 13,
      "source-layer": "place_label"
    },
    {
      "layout": {
        "text-font": {
          "stops": [
            [5, [
                "Open Sans Regular"
              ]
            ],
            [8, [
                "Open Sans SemiBold"
              ]
            ]
          ]
        },
        "text-field": "{name_en}",
        "text-size": {
          "stops": [
            [5, 12],
            [10, 16]
          ]
        },
        "text-max-width": 8,
        "symbol-avoid-edges": true
      },
      "metadata": {
        "mapbox:group": "1444849272561.29"
      },
      "filter": [
        "all",
        [
          "==",
          "class",
          "city"
        ],
        [
          "\u003C=",
          "rank",
          1]
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "place_label_important_city",
      "paint": {
        "text-color": "#333",
        "text-halo-color": "rgba(255,255,255,0.8)",
        "text-halo-width": 1.2
      },
      "minzoom": 5,
      "maxzoom": 10,
      "source-layer": "place_label"
    },
    {
      "layout": {
        "text-font": [
          "Open Sans Semibold"
        ],
        "text-field": "{name_en}",
        "text-size": {
          "stops": [
            [5, 14],
            [12, 18]
          ]
        },
        "text-max-width": 8,
        "icon-image": "star-11",
        "icon-anchor": "bottom",
        "icon-offset": [0, -2],
        "symbol-sort-key": [
          "get",
          "rank"
        ]
      },
      "metadata": {
        "mapbox:group": "1444849272561.29"
      },
      "filter": [
        "all",
        [
          "==",
          "class",
          "city"
        ],
        [
          "==",
          "capital",
          2]
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "place_label_country_capital_city",
      "paint": {
        "text-color": "#333",
        "text-halo-color": "rgba(255,255,255,0.8)",
        "text-halo-width": 1.2
      },
      "minzoom": 4,
      "maxzoom": 13,
      "source-layer": "place_label"
    },
    {
      "layout": {
        "text-font": {
          "stops": [
            [5, [
                "Open Sans Regular"
              ]
            ],
            [6, [
                "Open Sans Semibold"
              ]
            ]
          ]
        },
        "text-field": "{name_en}",
        "text-max-width": 8,
        "text-size": {
          "stops": [
            [5, 13],
            [12, 18]
          ]
        }
      },
      "metadata": {
        "mapbox:group": "1444849272561.29"
      },
      "filter": [
        "all",
        [
          "==",
          "class",
          "city"
        ],
        [
          "==",
          "capital",
          4]
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "place_label_capital_city",
      "paint": {
        "text-color": "#333",
        "text-halo-color": "rgba(255,255,255,0.8)",
        "text-halo-width": 1.2
      },
      "minzoom": 5,
      "maxzoom": 13,
      "source-layer": "place_label"
    },
    {
      "layout": {
        "text-font": {
          "stops": [
            [3, [
                "Open Sans Regular"
              ]
            ],
            [4, [
                "Open Sans Semibold"
              ]
            ]
          ]
        },
        "text-field": "{name_en}",
        "text-max-width": 8,
        "symbol-avoid-edges": true,
        "text-size": {
          "stops": [
            [3, 12],
            [5, 18]
          ]
        }
      },
      "metadata": {
        "mapbox:group": "1444849272561.29"
      },
      "filter": [
        "==",
        "class",
        "state"
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "place_label_state",
      "paint": {
        "text-color": "#555",
        "text-halo-color": "rgba(255,255,255,0.8)",
        "text-halo-width": 1.2
      },
      "minzoom": 3,
      "source-layer": "place_label"
    },
    {
      "layout": {
        "text-font": [
          "Open Sans Italic"
        ],
        "text-field": "{name_en}",
        "symbol-avoid-edges": true,
        "text-letter-spacing": 0.2,
        "symbol-placement": "line",
        "text-size": {
          "stops": [
            [3, 11],
            [4, 12]
          ]
        }
      },
      "metadata": {
        "mapbox:group": "1444849258897.3083"
      },
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "\u003E=",
          "rank",
          4]
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "marine_label_line_4",
      "paint": {
        "text-color": "#74aee9",
        "text-halo-color": "rgba(255,255,255,0.7)",
        "text-halo-width": 0.75,
        "text-halo-blur": 0.75
      },
      "source-layer": "marine_label"
    },
    {
      "layout": {
        "text-font": [
          "Open Sans Italic"
        ],
        "text-field": "{name_en}",
        "text-max-width": 6,
        "text-letter-spacing": 0.2,
        "symbol-placement": "point",
        "text-size": {
          "stops": [
            [3, 11],
            [4, 12]
          ]
        }
      },
      "metadata": {
        "mapbox:group": "1444849258897.3083"
      },
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "\u003E=",
          "rank",
          4]
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "marine_label_4",
      "paint": {
        "text-color": "#74aee9",
        "text-halo-color": "rgba(255,255,255,0.7)",
        "text-halo-width": 0.75,
        "text-halo-blur": 0.75
      },
      "source-layer": "marine_label"
    },
    {
      "layout": {
        "text-font": [
          "Open Sans Italic"
        ],
        "text-field": "{name_en}",
        "text-letter-spacing": 0.2,
        "symbol-placement": "line",
        "text-size": {
          "stops": [
            [3, 11],
            [4, 14]
          ]
        }
      },
      "metadata": {
        "mapbox:group": "1444849258897.3083"
      },
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "==",
          "rank",
          3]
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "marine_label_line_3",
      "paint": {
        "text-color": "#74aee9",
        "text-halo-color": "rgba(255,255,255,0.7)",
        "text-halo-width": 0.75,
        "text-halo-blur": 0.75
      },
      "minzoom": 4,
      "source-layer": "marine_label"
    },
    {
      "layout": {
        "text-font": [
          "Open Sans Italic"
        ],
        "text-field": "{name_en}",
        "text-max-width": 5,
        "text-letter-spacing": 0.2,
        "symbol-placement": "point",
        "text-size": {
          "stops": [
            [3, 11],
            [4, 14]
          ]
        }
      },
      "metadata": {
        "mapbox:group": "1444849258897.3083"
      },
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "rank",
          3]
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "marine_label_point_3",
      "paint": {
        "text-color": "#74aee9",
        "text-halo-color": "rgba(255,255,255,0.7)",
        "text-halo-width": 0.75,
        "text-halo-blur": 0.75
      },
      "minzoom": 4,
      "source-layer": "marine_label"
    },
    {
      "layout": {
        "text-font": [
          "Open Sans Italic"
        ],
        "text-field": "{name_en}",
        "text-letter-spacing": 0.2,
        "symbol-placement": "line",
        "text-size": {
          "stops": [
            [3, 12],
            [4, 14]
          ]
        }
      },
      "metadata": {
        "mapbox:group": "1444849258897.3083"
      },
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "==",
          "rank",
          2]
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "marine_label_line_2",
      "paint": {
        "text-color": "#74aee9",
        "text-halo-color": "rgba(255,255,255,0.7)",
        "text-halo-width": 0.75,
        "text-halo-blur": 0.75
      },
      "minzoom": 3,
      "source-layer": "marine_label"
    },
    {
      "layout": {
        "text-font": [
          "Open Sans Italic"
        ],
        "text-field": "{name_en}",
        "text-max-width": 5,
        "text-letter-spacing": 0.2,
        "symbol-placement": "point",
        "text-size": {
          "stops": [
            [3, 12],
            [4, 14]
          ]
        }
      },
      "metadata": {
        "mapbox:group": "1444849258897.3083"
      },
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "rank",
          2]
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "marine_label_point_2",
      "paint": {
        "text-color": "#74aee9",
        "text-halo-color": "rgba(255,255,255,0.7)",
        "text-halo-width": 0.75,
        "text-halo-blur": 0.75
      },
      "minzoom": 3,
      "source-layer": "marine_label"
    },
    {
      "layout": {
        "text-font": [
          "Open Sans Italic"
        ],
        "text-field": "{name_en}",
        "text-letter-spacing": 0.2,
        "symbol-placement": "line",
        "text-size": {
          "stops": [
            [3, 18],
            [4, 22]
          ]
        }
      },
      "metadata": {
        "mapbox:group": "1444849258897.3083"
      },
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "==",
          "rank",
          1]
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "marine_label_line_1",
      "paint": {
        "text-color": "#74aee9",
        "text-halo-color": "rgba(255,255,255,0.7)",
        "text-halo-width": 0.75,
        "text-halo-blur": 0.75
      },
      "source-layer": "marine_label",
      "minzoom": 1
    },
    {
      "layout": {
        "text-font": [
          "Open Sans Italic"
        ],
        "text-field": "{name_en}",
        "text-max-width": 5,
        "text-letter-spacing": 0.2,
        "text-line-height": 1.6,
        "symbol-placement": "point",
        "text-offset": [0, 2.4],
        "text-size": {
          "stops": [
            [3, 12],
            [4, 22]
          ]
        }
      },
      "metadata": {
        "mapbox:group": "1444849258897.3083"
      },
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "rank",
          1]
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "marine_label_point_1",
      "paint": {
        "text-color": "#74aee9",
        "text-halo-color": "rgba(255,255,255,0.7)",
        "text-halo-width": 0.75,
        "text-halo-blur": 0.75
      },
      "source-layer": "marine_label",
      "minzoom": 1
    },
    {
      "layout": {
        "text-font": [
          "Open Sans Bold"
        ],
        "text-field": "{name_en}",
        "text-max-width": 6.25,
        "text-transform": "uppercase",
        "text-size": {
          "stops": [
            [2, 12],
            [4, 16]
          ]
        }
      },
      "metadata": {
        "mapbox:group": "1444849242106.713"
      },
      "filter": [
        "all",
        [
          "==",
          "class",
          "country"
        ],
        [
          "\u003E=",
          "rank",
          4]
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "country_label_4",
      "paint": {
        "text-color": "#334",
        "text-halo-color": "rgba(255,255,255,0.8)",
        "text-halo-width": 2,
        "text-halo-blur": 1
      },
      "source-layer": "place_label"
    },
    {
      "layout": {
        "text-font": [
          "Open Sans Bold"
        ],
        "text-field": "{name_en}",
        "text-max-width": 6.25,
        "symbol-avoid-edges": true,
        "text-transform": "uppercase",
        "text-size": {
          "stops": [
            [2, 12],
            [4, 16]
          ]
        }
      },
      "metadata": {
        "mapbox:group": "1444849242106.713"
      },
      "filter": [
        "all",
        [
          "==",
          "class",
          "country"
        ],
        [
          "\u003E=",
          "rank",
          3]
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "country_label_3",
      "paint": {
        "text-color": "#334",
        "text-halo-color": "rgba(255,255,255,0.8)",
        "text-halo-width": 2,
        "text-halo-blur": 1
      },
      "source-layer": "place_label"
    },
    {
      "layout": {
        "text-font": [
          "Open Sans Bold"
        ],
        "text-field": "{name_en}",
        "text-max-width": 6.25,
        "symbol-avoid-edges": true,
        "text-transform": "uppercase",
        "text-size": {
          "stops": [
            [2, 12],
            [4, 16]
          ]
        }
      },
      "metadata": {
        "mapbox:group": "1444849242106.713"
      },
      "filter": [
        "all",
        [
          "==",
          "class",
          "country"
        ],
        [
          "\u003E=",
          "rank",
          2]
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "country_label_2",
      "paint": {
        "text-color": "#334",
        "text-halo-color": "rgba(255,255,255,0.8)",
        "text-halo-width": 2,
        "text-halo-blur": 1
      },
      "source-layer": "place_label"
    },
    {
      "layout": {
        "text-font": [
          "Open Sans Bold"
        ],
        "text-field": "{name_en}",
        "text-max-width": 6.25,
        "symbol-avoid-edges": true,
        "text-transform": "uppercase",
        "text-size": {
          "stops": [
            [2, 12],
            [4, 16]
          ]
        }
      },
      "metadata": {
        "mapbox:group": "1444849242106.713"
      },
      "filter": [
        "all",
        [
          "==",
          "class",
          "country"
        ],
        [
          "\u003E=",
          "rank",
          1]
      ],
      "type": "symbol",
      "source": "locationiq",
      "id": "country_label_1",
      "paint": {
        "text-color": "#334",
        "text-halo-color": "rgba(255,255,255,0.8)",
        "text-halo-width": 2,
        "text-halo-blur": 1
      },
      "source-layer": "place_label"
    },
    {
      "id": "housenumber_label",
      "type": "symbol",
      "source": "locationiq",
      "source-layer": "housenumber_label",
      "layout": {
        "text-field": "{house_num}",
        "text-size": 11
      },
      "minzoom": 17,
      "paint": {
        "text-color": "#595756"
      }
    }
  ]
}