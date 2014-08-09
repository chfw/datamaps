How to create custom map in one file
=====================================

### Custom Map

First of all, please follow the instructions to incorporate [your custom map](http://datamaps.markmarkoh.com/using-custom-map-data-w-datamaps/). Please then follow the corrections were made by the comment "og lozap":

1. I used ne_10m_admin_1_states_provinces www.naturalearthdata.com/http/... instead of ne_10m_admin_0_map_subunits.shp to actually get the proper provinces subdivision, otherwise is only one big country.

2. Changed the first command to ogr2ogr -f GeoJSON -where "ADM0_A3 IN ('AFG')" afghan.json ne_10m_admin_1_states_provinces.shp -- using "afghan" NOT "subunits" because inside index.html that is the name used under "scope"

3. Changed the second command topojson --id-property adm1_code -p name=NAME -p name -o customAfghanMap.topo.json afghan.json

### Package up the map

#### Add your files

```html
cp customAfghanMap.topo.json DATAMAPS_DIR/src/js/data/afghan.topo.json
cp afghan.json DATAMAPS_DIR/src/js/data/afghan.json
```

#### Edit Gruntfile.js

```html
      afghan: {
        src: ['src/js/datamaps.js'],
        dest: 'src/rel/datamaps.afghan.js',
        replacements: [{
          from: '\'__AFGHAN__\'',
          to: '<%= grunt.file.read("src/js/data/afghan.topo.json") %>'
        }]
      },
      all: [...
        {
          from: '\'__AFGHAN__\'',
          to: '<%= grunt.file.read("src/js/data/afghan.topo.json") %>'
        }
      ...
      ]
      uglify: {
        dist: {
           ...
           'src/rel/datamaps.afghan.min.js': ['src/rel/datamaps.afghan.js'],
           ...
        }
      }
```

#### Edit src/js/datamaps.js

```html
    ....
    if ( options.scope === 'usa' ) {
      projection = d3.geo.albersUsa()
        .scale(width)
        .translate([width / 2, height / 2]);
    }
    else if ( options.scope === 'world' ) {
      projection = d3.geo[options.projection]()
        .scale((width + 1) / 2 / Math.PI)
        .translate([width / 2, height / (options.projection === "mercator" ? 1.45 : 1.8)]);
    }else if ( options.scope === 'afghan' ) {
     /* Your own projection here */
    }
  ....
  /**************************************
                TopoJSON
  ***************************************/
  Datamap.prototype.worldTopo = '__WORLD__';
  Datamap.prototype.usaTopo = '__USA__';
  Datamap.prototype.afghanTopo = '__AFGHAN__';

```

### Build

Then run the command. You will then find your map in dist/datamaps.afghan.js and dist/datamaps.afghan.min.js

```
grunt build
```
