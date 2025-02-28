var mapBoxToken = "pk.eyJ1Ijoic3RlcGhhbmVkZWJveXNzb24iLCJhIjoiY2lvN3A1eGQ4MDA3M3Z5a3AzNzQzMmJsZCJ9.u_6ia9oYkGwdRpjQ1R8_qg";

var vectorStr = "vector";
var fillOutlineColorDefault = "rgba(255, 255, 255, 0)";
var fillStr = "fill";
var qualitesColDefault = "NIVEAU";
var qualitesDefault = ['CL', 'BC', 'TBC'];
var itineranceColDefault = "OPERATEUR";
var itineranceDefault = [20801, 20815];
var monoColorDefault = "#e36565";
var multipleColorsDefault = ['#efa7a7', '#e36565', '#d82424'];
var opacityMonoColorDefault = 0.5;
var opactiyMultipleColorsDefault = 0.7;

// Variable pylône
var pyloneSourceOutremerId = "mapbox://stephanedeboysson.alzen5dr";
var pyloneLayerOutremerId = "reporting_sites_formate_T4_20-5eelvg";
//variable QoS agglo data ZOI
var QoSaggloDataSourceOutremerId = "mapbox://stephanedeboysson.4gy5wcw3";
var QoSaggloDataLayerOutremerId = "ALL_DATA_LDV_partial_ZOI_2022-5pc4tt";
//variable QoS agglo voix/SMS ZOI
var QoSaggloVoixSourceOutremerId = "mapbox://stephanedeboysson.641q2lx0";
var QoSaggloVoixLayerOutremerId = "ALL_VOIX_SMS_LDV_partial_ZOI_-2qypxf";
//variable QoS transport data ZOI
var QoStransportsDataSourceOutremerId = "mapbox://stephanedeboysson.c2v28ady";
var QoStransportsDataLayerOutremerId = "ALL_DATA_AXE_partial_ZOI_2022-21z38r";
//variable QoS transport voix/SMS ZOI
var QoStransportsVoixSourceOutremerId = "mapbox://stephanedeboysson.9p45k0ld";
var QoStransportsVoixLayerOutremerId = "ALL_VOIX_SMS_AXE_partial_ZOI_-0n65jm";
//variable QoS agglo data ZAG
var QoSaggloDataSourceOutremerIdZAG = "mapbox://stephanedeboysson.98uqr5hw";
var QoSaggloDataLayerOutremerIdZAG = "DATA_LDV_ZAG-bjkpss";
//variable QoS agglo voix/SMS ZAG
var QoSaggloVoixSourceOutremerIdZAG = "mapbox://stephanedeboysson.4bmgphup";
var QoSaggloVoixLayerOutremerIdZAG = "voix_LDV-cqykw5";
//variable QoS transport data ZAG
var QoStransportsDataSourceOutremerIdZAG = "mapbox://stephanedeboysson.6mvdnaja";
var QoStransportsDataLayerOutremerIdZAG = "DATA_AXES_ZAG-4z6c0v";
//variable QoS transport voix/SMS ZAG
var QoStransportsVoixSourceOutremerIdZAG = "mapbox://stephanedeboysson.a7jdxpgh";
var QoStransportsVoixLayerOutremerIdZAG = "voix_AXES-4ahez9";



function creerSource(id, type, url){
    var source = {};
    source.id = id;
    source.type = type;
    source.url = url;
    return source;
}

function creerCompositeSources(id, sources) {
  var source = {};
  source.id = id;
  source.type = "composite";
  source.sources = sources;
  return source;
}

function creerLayerCouverture(id, type, source, sourceLayer, fillColor, qualitesCol, qualites, fillOpacity, fillOutlineColor){
    if(qualitesCol === undefined) qualitesCol = qualitesColDefault;
    if(qualites === undefined) qualites = qualitesDefault;
    if(fillOpacity === undefined) fillOpacity = (fillColor.constructor === Array)?opactiyMultipleColorsDefault:opacityMonoColorDefault;
    if(fillOutlineColor === undefined) fillOutlineColor = fillOutlineColorDefault;
    var layer = {};
    layer.id = id;
    layer.type = type;
    layer.source = source;
    layer.sourceLayer = sourceLayer;
    layer.paint = {};
    if (fillColor.constructor === Array){
        layer.paint.fillColor = ['match',['get', qualitesCol]];
        for(var i=0;i<3;i++){
             layer.paint.fillColor.push(qualites[i]);
             layer.paint.fillColor.push(fillColor[i]);
        }
        layer.paint.fillColor.push('white');
    } else {
        layer.paint.fillColor = fillColor;
    }
    layer.paint.fillOpacity = fillOpacity;
    layer.paint.fillOutlineColor = fillOutlineColor;
    return layer;
}

function creerLayerCouvertureItinerance(id, type, source, sourceLayer, fillColor, itineranceCol, itinerance, fillOpacity, fillOutlineColor){
    if(fillOutlineColor === undefined) fillOutlineColor = fillOutlineColorDefault;
    var layer = {};
    layer.id = id;
    layer.type = type;
    layer.source = source;
    layer.sourceLayer = sourceLayer;
    layer.paint = {};
    if(fillColor.constructor === Array){
        layer.paint.fillColor = ['match',['get', itineranceCol]];
        for(var i=0;i<2;i++){
             layer.paint.fillColor.push(itinerance[i]);
             layer.paint.fillColor.push(fillColor[i]);
        }
        layer.paint.fillColor.push('white');
    } else {
        layer.paint.fillColor = fillColor;
    }
    layer.paint.fillOpacity = fillOpacity;
    layer.paint.fillOutlineColor = fillOutlineColor;
    return layer;
}

function creerLayer(id, source, sourceLayer, typeBilan){
    var layer = {};
    layer.id = id;
    layer.source = source;
    layer.sourceLayer = sourceLayer;
    layer.typeBilan = typeBilan;
	  layer.layout = {"icon-allow-overlap": false}
    return layer;
}

function buildHashTable(map, obj, index) {
    map[obj.id] = index;
    return map;
}

var mbData = {
    "sources": [
        //STB
        /*creerSource("2G_Orange_stb", vectorStr, "mapbox://stephanedeboysson.44l3bowe"),
        creerCompositeSources("2G_stb", ["2G_Orange_stb"]),*/

        creerSource("stb_QoS_transports_data_arcep", vectorStr, QoStransportsDataSourceOutremerIdZAG),
        creerSource("stb_QoS_transports_voix_arcep", vectorStr, QoStransportsVoixSourceOutremerIdZAG),
        creerSource("stb_QoS_agglos_data_arcep", vectorStr, QoSaggloDataSourceOutremerIdZAG),
        creerSource("stb_QoS_agglos_voix_arcep", vectorStr, QoSaggloVoixSourceOutremerIdZAG),
        creerSource("stb_sites", vectorStr, pyloneSourceOutremerId),
        creerSource("2G_Digicel_stb", vectorStr, "mapbox://stephanedeboysson.6cp8a5pw"),// MAJ le 12/04/23
        creerSource("2G3G_Digicel_stb",vectorStr,"mapbox://stephanedeboysson.46hfv6r8"),// MAJ le 12/04/23
        creerSource("3G_Digicel_stb", vectorStr, "mapbox://stephanedeboysson.3o6tsq19"),// MAJ le 12/04/23
		creerSource("4G_Digicel_stb", vectorStr, "mapbox://stephanedeboysson.5myxpe8a"), // MAJ le12/04/23
        creerSource("2G_Orange_stb", vectorStr, "mapbox://stephanedeboysson.dup18i25"),// MAJ le 12/04/23
        creerSource("2G3G_Orange_stb",vectorStr,"mapbox://stephanedeboysson.6q2ukcsa"),// MAJ le 12/04/23
        creerSource("3G_Orange_stb", vectorStr, "mapbox://stephanedeboysson.3p4pqyfl"),// MAJ le 12/04/23
        creerSource("4G_Orange_stb", vectorStr, "mapbox://stephanedeboysson.bsddsdfn"), // MAJ le 12/04/23
        //creerSource("2G_FM_stb", vectorStr, "mapbox://stephanedeboysson.8lklnj9c"),// MAJ le 12/04/23
        creerSource("2G3G_FM_stb",vectorStr,"mapbox://stephanedeboysson.1tbx38qf"),// MAJ le 12/04/23
        creerSource("3G_FM_stb", vectorStr, "mapbox://stephanedeboysson.4h25amw2"),// MAJ le 12/04/23
        creerSource("4G_FM_stb", vectorStr, "mapbox://stephanedeboysson.9a8y4l4i"), // MAJ le 12/04/23
        //creerSource("2G_DT_stb", vectorStr, "mapbox://stephanedeboysson.0c0sz6z9"), **pas de carte 2G au T4 2022
        creerSource("2G3G_DT_stb", vectorStr, "mapbox://stephanedeboysson.5wwix73t"),// MAJ le 12/04/23
        creerSource("3G_DT_stb", vectorStr, "mapbox://stephanedeboysson.34wxsamg"),// MAJ le 10/08/22
        creerSource("4G_DT_stb", vectorStr, "mapbox://stephanedeboysson.d5184vd8"), // MAJ le 16/11/22
        creerCompositeSources("2G_stb", ["2G_Digicel_stb", "2G_Orange_stb", /*"2G_frca_stb", "2G_DT_stb"*/]),
        creerCompositeSources("2G3G_stb", ["2G3G_Digicel_stb", "2G3G_Orange_stb", "2G3G_FM_stb", "2G3G_DT_stb"]),
        creerCompositeSources("3G_stb", ["3G_Digicel_stb", "3G_Orange_stb", "3G_DT_stb", "3G_FM_stb"]),
        creerCompositeSources("4G_stb", ["4G_Digicel_stb", "4G_Orange_stb", "4G_DT_stb", "4G_FM_stb" ]),
        //STM
        /*creerSource("4G_Digicel_stm", vectorStr, "mapbox://stephanedeboysson.02gaqqzx"),
        creerCompositeSources("4G_stm", ["4G_Digicel_stm"]),*/
        creerSource("stm_QoS_transports_data_arcep", vectorStr, QoStransportsDataSourceOutremerIdZAG),
        creerSource("stm_QoS_transports_voix_arcep", vectorStr, QoStransportsVoixSourceOutremerIdZAG),
        creerSource("stm_QoS_agglos_data_arcep", vectorStr, QoSaggloDataSourceOutremerIdZAG),
        creerSource("stm_QoS_agglos_voix_arcep", vectorStr, QoSaggloVoixSourceOutremerIdZAG),
        creerSource("stm_sites", vectorStr, "mapbox://stephanedeboysson.dtad9ota"), 
        creerSource("stm_sites", vectorStr, pyloneSourceOutremerId),
        creerSource("2G_Digicel_stm", vectorStr, "mapbox://stephanedeboysson.946co4je"),// MAJ le 12/04/23
        creerSource("2G3G_Digicel_stm", vectorStr, "mapbox://stephanedeboysson.b3uho5b6"),// MAJ le 12/04/23
        creerSource("3G_Digicel_stm", vectorStr, "mapbox://stephanedeboysson.3axrzfvv"),// MAJ le 12/04/23
		creerSource("4G_Digicel_stm", vectorStr, "mapbox://stephanedeboysson.1s28ba5x"), // MAJ le 12/04/23
        creerSource("2G_Orange_stm", vectorStr, "mapbox://stephanedeboysson.bi75k54a"),// MAJ le 12/04/23
        creerSource("2G3G_Orange_stm", vectorStr, "mapbox://stephanedeboysson.bg2icd9b"),// MAJ le 12/04/23
        creerSource("3G_Orange_stm", vectorStr, "mapbox://stephanedeboysson.axdz3cpf"),// MAJ le 12/04/23
        creerSource("4G_Orange_stm", vectorStr, "mapbox://stephanedeboysson.cqtvugjw"), // MAJ le 12/04/23
        //creerSource("2G_FM_stb", vectorStr, "mapbox://stephanedeboysson.8lklnj9c"),// MAJ le 12/04/23
        creerSource("2G3G_FM_stm",vectorStr,"mapbox://stephanedeboysson.9o72dghp"),// MAJ le 12/04/23
        creerSource("3G_FM_stm", vectorStr, "mapbox://stephanedeboysson.aceb8l1o"),// MAJ le 12/04/23
        creerSource("4G_FM_stm", vectorStr, "mapbox://stephanedeboysson.4kultws0"), // MAJ le 12/04/23
        // creerSource("2G_DT_stm", vectorStr, "mapbox://stephanedeboysson.3i8ok0aq"), //**Dauphin a éteint la 2G au T3 2020
        //en théorie, il faudrait ici la carte 2G3G voix de Dauphin (qui correspondrait à une carte 3G voix en pratique)
        creerSource("2G3G_DT_stm", vectorStr, "mapbox://stephanedeboysson.4f6mqeuy"),// MAJ le 12/04/23
        creerSource("3G_DT_stm", vectorStr, "mapbox://stephanedeboysson.6a42die2"),// MAJ le 12/04/23
        creerSource("4G_DT_stm", vectorStr, "mapbox://stephanedeboysson.0y0mwjm7"), // MAJ le 12/04/23
        creerSource("2G3G_UTS_stm", vectorStr, "mapbox://stephanedeboysson.b0862n71"),// MAJ le12/04/23
        creerSource("3G_UTS_stm", vectorStr, "mapbox://stephanedeboysson.5ynwv8s8"), // MAJ le 12/04/23
        creerSource("4G_UTS_stm", vectorStr, "mapbox://stephanedeboysson.6c7cbnja"), // MAJ le 12/04/23
        creerCompositeSources("2G_stm", ["2G_Digicel_stm", "2G_Orange_stm"]),
        creerCompositeSources("2G3G_stm", ["2G3G_Digicel_stm", "2G3G_Orange_stm", "2G3G_FM_stm", "2G3G_DT_stm", "2G3G_UTS_stm"]),
        creerCompositeSources("3G_stm", ["3G_Digicel_stm", "3G_Orange_stm","3G_FM_stm", "3G_DT_stm", "3G_UTS_stm"]),
        //creerCompositeSources("3G_stm", ["3G_Digicel_stm", "3G_Orange_stm", "3G_DT_stm"]),
        creerCompositeSources("4G_stm", ["4G_Digicel_stm", "4G_Orange_stm", "4G_FM_stm", "4G_DT_stm", "4G_UTS_stm"]),
        // Guadeloupe
        creerSource("guadeloupe_QoS_transports_data_arcep", vectorStr, QoStransportsDataSourceOutremerIdZAG),
        creerSource("guadeloupe_QoS_transports_voix_arcep", vectorStr, QoStransportsVoixSourceOutremerIdZAG),
        
        //version en ligne
        //creerSource("guadeloupe_QoS_agglos_data_arcep", vectorStr, "mapbox://stephanedeboysson.1icvyotu"),
        //creerSource("guadeloupe_QoS_agglos_voix_arcep", vectorStr, "mapbox://stephanedeboysson.3dusii74"),
        
        // version OK NOK succes 3G succès 4G
        //creerSource("guadeloupe_QoS_agglos_data_arcep", vectorStr, "mapbox://stephanedeboysson.bqhk67ml"),
        
        //version 0 et 1 "numeric"
        creerSource("guadeloupe_QoS_agglos_data_arcep", vectorStr, QoSaggloDataSourceOutremerIdZAG),
        creerSource("guadeloupe_QoS_agglos_voix_arcep", vectorStr, QoSaggloVoixSourceOutremerIdZAG),
        creerSource("guadeloupe_sites", vectorStr, pyloneSourceOutremerId),//MAJ le 12/04/23
        creerSource("2G_Digicel_guadeloupe", vectorStr, "mapbox://stephanedeboysson.4fs6koqp"),// MAJ le 12/04/23
        creerSource("2G3G_Digicel_guadeloupe", vectorStr,"mapbox://stephanedeboysson.1336cv7w"),// MAJ le 12/04/23
        creerSource("3G_Digicel_guadeloupe", vectorStr, "mapbox://stephanedeboysson.02nylut7"),// MAJ le 12/04/23
		creerSource("4G_Digicel_guadeloupe", vectorStr, "mapbox://stephanedeboysson.1lhm6j6k"), // MAJ le 12/04/23
        creerSource("2G_Orange_guadeloupe", vectorStr, "mapbox://stephanedeboysson.4atf5qd3"),// MAJ le 12/04/23
        creerSource("2G3G_Orange_guadeloupe", vectorStr, "mapbox://stephanedeboysson.9phmbae4"),// MAJ le 12/04/23
        creerSource("3G_Orange_guadeloupe", vectorStr, "mapbox://stephanedeboysson.4stwi1g6"),// MAJ le 12/04/23
        creerSource("4G_Orange_guadeloupe", vectorStr, "mapbox://stephanedeboysson.cduvsnby"), // MAJ le 12/04/23
        //creerSource("2G_FM_stb", vectorStr, "mapbox://stephanedeboysson.8lklnj9c"),// MAJ le 12/04/23
        creerSource("2G3G_FM_guadeloupe",vectorStr,"mapbox://stephanedeboysson.81p8cekc"),// MAJ le 12/04/23
        creerSource("3G_FM_guadeloupe", vectorStr, "mapbox://stephanedeboysson.3d0gaoht"),// MAJ le 12/04/23
        creerSource("4G_FM_guadeloupe", vectorStr, "mapbox://stephanedeboysson.dnklk6c9"), // MAJ le 12/04/23
        creerSource("2G_OMT_guadeloupe", vectorStr, "mapbox://stephanedeboysson.cftxok65"),// MAJ le 12/04/23
        creerSource("2G3G_OMT_guadeloupe", vectorStr, "mapbox://stephanedeboysson.clwq9wgo"),// MAJ le 12/04/23
        creerSource("3G_OMT_guadeloupe", vectorStr, "mapbox://stephanedeboysson.8t6tjk85"),// MAJ le 12/04/23
        creerSource("4G_OMT_guadeloupe", vectorStr, "mapbox://stephanedeboysson.5gg6jcdh"), // MAJ le 12/04/23
        creerCompositeSources("2G_guadeloupe", ["2G_Digicel_guadeloupe", "2G_Orange_guadeloupe", "2G_OMT_guadeloupe"]),
        creerCompositeSources("2G3G_guadeloupe", ["2G3G_Digicel_guadeloupe", "2G3G_Orange_guadeloupe", "2G3G_FM_guadeloupe", "2G3G_OMT_guadeloupe"]),
        creerCompositeSources("3G_guadeloupe", ["3G_Digicel_guadeloupe", "3G_Orange_guadeloupe", "3G_FM_guadeloupe", "3G_OMT_guadeloupe"]),
        creerCompositeSources("4G_guadeloupe", ["4G_Digicel_guadeloupe", "4G_Orange_guadeloupe", "4G_FM_guadeloupe", "4G_OMT_guadeloupe"]),
        // Guyane
        creerSource("guyane_QoS_transports_data_arcep", vectorStr, QoStransportsDataSourceOutremerIdZAG),
        creerSource("guyane_QoS_transports_voix_arcep", vectorStr, QoStransportsVoixSourceOutremerIdZAG),
        creerSource("guyane_QoS_agglos_data_arcep", vectorStr, QoSaggloDataSourceOutremerIdZAG),
        creerSource("guyane_QoS_agglos_voix_arcep", vectorStr, QoSaggloVoixSourceOutremerIdZAG),
        creerSource("guyane_sites", vectorStr, "mapbox://stephanedeboysson.01lnbevc"),
        creerSource("guyane_sites", vectorStr, pyloneSourceOutremerId),
        creerSource("2G_Digicel_guyane", vectorStr, "mapbox://stephanedeboysson.85etz7tq"),// MAJ le 12/04/23
        creerSource("2G3G_Digicel_guyane", vectorStr, "mapbox://stephanedeboysson.byx4kvw3"),// MAJ le 12/04/23
        creerSource("3G_Digicel_guyane", vectorStr, "mapbox://stephanedeboysson.dtgtdhdz"),// MAJ le 12/04/23
		creerSource("4G_Digicel_guyane", vectorStr, "mapbox://stephanedeboysson.6m6h6nl5"), // MAJ le 12/04/23
        creerSource("2G_Orange_guyane", vectorStr, "mapbox://stephanedeboysson.8m7adcxh"),// MAJ le12/04/23
        creerSource("2G3G_Orange_guyane", vectorStr, "mapbox://stephanedeboysson.91vjgu76"), // MAJ le12/04/23
        creerSource("3G_Orange_guyane", vectorStr, "mapbox://stephanedeboysson.da6s9mvb"),// MAJ le12/04/23
        creerSource("4G_Orange_guyane", vectorStr, "mapbox://stephanedeboysson.9raxzneh"), // MAJ le 12/04/23
        //creerSource("2G_FM_guyane", vectorStr, "mapbox://stephanedeboysson.8lklnj9c"),// MAJ le 12/04/23
        creerSource("2G3G_FM_guyane",vectorStr,"mapbox://stephanedeboysson.bu0fuqac"),// MAJ le 12/04/23
        creerSource("3G_FM_guyane", vectorStr, "mapbox://stephanedeboysson.8441xjpx"),// MAJ le 12/04/23
        creerSource("4G_FM_guyane", vectorStr, "mapbox://stephanedeboysson.82u6wumh"), // MAJ le 12/04/23
        creerSource("2G_OMT_guyane", vectorStr, "mapbox://stephanedeboysson.3jz218wk"),// MAJ le 12/04/23
        creerSource("2G3G_OMT_guyane", vectorStr, "mapbox://stephanedeboysson.1dx1ygv6"),// MAJ le 12/04/23
        creerSource("3G_OMT_guyane", vectorStr, "mapbox://stephanedeboysson.ae7z3zky"),// MAJ le 12/04/23
        creerSource("4G_OMT_guyane", vectorStr, "mapbox://stephanedeboysson.2fhrvdii"), // MAJ le 12/04/23
        creerCompositeSources("2G_guyane", ["2G_Digicel_guyane", "2G_Orange_guyane", "2G_OMT_guyane"]),
        creerCompositeSources("2G3G_guyane", ["2G3G_Digicel_guyane", "2G3G_Orange_guyane", "2G3G_FM_guyane", "2G3G_OMT_guyane"]),
        creerCompositeSources("3G_guyane", ["3G_Digicel_guyane", "3G_Orange_guyane", "3G_FM_guyane", "3G_OMT_guyane"]),
        creerCompositeSources("4G_guyane", ["4G_Digicel_guyane", "4G_Orange_guyane", "4G_FM_guyane", "4G_OMT_guyane"]),
        
        
        // Martinique
        creerSource("martinique_QoS_transports_data_arcep", vectorStr, QoStransportsDataSourceOutremerIdZAG),
        creerSource("martinique_QoS_transports_voix_arcep", vectorStr, QoStransportsVoixSourceOutremerIdZAG),
        creerSource("martinique_QoS_agglos_data_arcep", vectorStr, QoSaggloDataSourceOutremerIdZAG),
        creerSource("martinique_QoS_agglos_voix_arcep", vectorStr, QoSaggloVoixSourceOutremerIdZAG),
        creerSource("martinique_sites", vectorStr, "mapbox://stephanedeboysson.17xy1l63"),
        creerSource("martinique_sites", vectorStr, pyloneSourceOutremerId), 
        creerSource("2G_Orange_martinique", vectorStr, "mapbox://stephanedeboysson.1oq3z0wd"), // MAJ le 12/04/23
        creerSource("2G3G_Orange_martinique", vectorStr, "mapbox://stephanedeboysson.6l29uj2h"),// MAJ le 12/04/23
        creerSource("3G_Orange_martinique", vectorStr, "mapbox://stephanedeboysson.apmchoqa"),// MAJ le 12/04/23
        creerSource("4G_Orange_martinique", vectorStr, "mapbox://stephanedeboysson.7z2zr1ay"), // MAJ le 12/04/23
        //creerSource("2G_FM_martinique", vectorStr, "mapbox://stephanedeboysson.8lklnj9c"),// MAJ le 12/04/23
        creerSource("2G3G_FM_martinique",vectorStr,"mapbox://stephanedeboysson.5jo0ck64"),// MAJ le 12/04/23
        creerSource("3G_FM_martinique", vectorStr, "mapbox://stephanedeboysson.7dpz7t3c"),// MAJ le 12/04/23
        creerSource("4G_FM_martinique", vectorStr, "mapbox://stephanedeboysson.6oqcjhgz"), // MAJ le 12/04/23
        creerSource("2G_Digicel_martinique", vectorStr, "mapbox://stephanedeboysson.2eyri5ez"),// MAJ le 12/04/23
        creerSource("2G3G_Digicel_martinique", vectorStr, "mapbox://stephanedeboysson.9f0o27hy"),//MAJ le 12/04/23 
        creerSource("3G_Digicel_martinique", vectorStr, "mapbox://stephanedeboysson.aoqwzvn3"),// MAJ le 12/04/23
		creerSource("4G_Digicel_martinique", vectorStr, "mapbox://stephanedeboysson.bniow4ur"), // MAJ le 12/04/23
        creerSource("2G_OMT_martinique", vectorStr, "mapbox://stephanedeboysson.awrpxcy7"),// MAJ le 12/04/23
        creerSource("2G3G_OMT_martinique", vectorStr, "mapbox://stephanedeboysson.6i4cd7r0"),// MAJ le 12/04/23
        creerSource("3G_OMT_martinique", vectorStr, "mapbox://stephanedeboysson.788qkx1x"),// MAJ le 12/04/23
        creerSource("4G_OMT_martinique", vectorStr, "mapbox://stephanedeboysson.8auw69ih"), // MAJ le 12/04/23
        creerCompositeSources("2G_martinique", ["2G_Orange_martinique", "2G_Digicel_martinique", "2G_OMT_martinique"]),
        creerCompositeSources("2G3G_martinique", ["2G3G_Orange_martinique","2G3G_FM_martinique", "2G3G_Digicel_martinique", "2G3G_OMT_martinique"]),
        creerCompositeSources("3G_martinique", ["3G_Orange_martinique","3G_FM_martinique", "3G_Digicel_martinique", "3G_OMT_martinique"]),
        creerCompositeSources("4G_martinique", ["4G_Orange_martinique","4G_FM_martinique", "4G_Digicel_martinique", "4G_OMT_martinique"]),
        
        
        // Mayotte
        creerSource("mayotte_QoS_transports_data_arcep", vectorStr, QoStransportsDataSourceOutremerId),
        creerSource("mayotte_QoS_transports_voix_arcep", vectorStr, QoStransportsVoixSourceOutremerId),
        creerSource("mayotte_QoS_agglos_data_arcep", vectorStr, QoSaggloDataSourceOutremerId),
        creerSource("mayotte_QoS_agglos_voix_arcep", vectorStr, QoSaggloVoixSourceOutremerId),
        creerSource("mayotte_sites", vectorStr, pyloneSourceOutremerId),
        creerSource("2G_SRR_mayotte", vectorStr, "mapbox://stephanedeboysson.6fdlaiss"),// MAJ le  12/04/23
        creerSource("2G3G_SRR_mayotte", vectorStr, "mapbox://stephanedeboysson.1q4mgc1e"),// MAJ le  12/04/23
        creerSource("3G_SRR_mayotte", vectorStr, "mapbox://stephanedeboysson.40a8572w"),// MAJ le  12/04/23
        creerSource("4G_SRR_mayotte", vectorStr, "mapbox://stephanedeboysson.1j2jtxpj"), // MAJ le  12/04/23
        creerSource("2G_BJT_mayotte", vectorStr, "mapbox://stephanedeboysson.1div0ciy"),//MAJ le  12/04/23  ::::::::::::::::::::::::::::::::::::::::::::::::::::::
        creerSource("2G3G_BJT_mayotte", vectorStr, "mapbox://stephanedeboysson.bgwz5pyl"), //MAJ le  12/04/23
    	creerSource("4G_BJT_mayotte", vectorStr, "mapbox://stephanedeboysson.5so04c8j"), //MAJ le  12/04/23
        creerSource("2G_FM_mayotte", vectorStr, "mapbox://stephanedeboysson.ce78ux8t"),// MAJ le  12/04/23
        creerSource("2G3G_FM_mayotte", vectorStr, "mapbox://stephanedeboysson.7o6ks2u4"),// MAJ le  12/04/23
        creerSource("3G_FM_mayotte", vectorStr, "mapbox://stephanedeboysson.dazjg1v4"),// MAJ le  12/04/23
        creerSource("4G_FM_mayotte", vectorStr, "mapbox://stephanedeboysson.dk9xqvhv"), // MAJ le  12/04/23
        creerSource("2G_Orange_mayotte", vectorStr, "mapbox://stephanedeboysson.1j4erjcj"),// MAJ le 12/04/23 
        creerSource("2G3G_Orange_mayotte", vectorStr, "mapbox://stephanedeboysson.b5w1aaai"),// MAJ le 12/04/23
        creerSource("3G_Orange_mayotte", vectorStr, "mapbox://stephanedeboysson.d0ct8m5q"),// MAJ le 12/04/23
        creerSource("4G_Orange_mayotte", vectorStr, "mapbox://stephanedeboysson.7zacvzvd"), // MAJ le 12/04/23
        creerCompositeSources("2G_mayotte", ["2G_SRR_mayotte", "2G_BJT_mayotte", "2G_FM_mayotte", "2G_Orange_mayotte"]),
        creerCompositeSources("2G3G_mayotte", ["2G3G_SRR_mayotte", "2G3G_BJT_mayotte", "2G3G_FM_mayotte", "2G3G_Orange_mayotte"]),
        creerCompositeSources("3G_mayotte", ["3G_SRR_mayotte", "3G_FM_mayotte", "3G_Orange_mayotte"]), // Attention aujourd'hui il n'y a pas de couverture de Maore, qui n'a pas de 3G
        creerCompositeSources("4G_mayotte", ["4G_BJT_mayotte", "4G_SRR_mayotte","4G_FM_mayotte", "4G_Orange_mayotte"]),
        
        
        
        // La Réunion
        creerSource("la_reunion_QoS_transports_data_arcep", vectorStr, QoStransportsDataSourceOutremerId),
        creerSource("la_reunion_QoS_transports_voix_arcep", vectorStr, QoStransportsVoixSourceOutremerId),
        creerSource("la_reunion_QoS_agglos_data_arcep", vectorStr, QoSaggloDataSourceOutremerId),
        creerSource("la_reunion_QoS_agglos_voix_arcep", vectorStr, QoSaggloVoixSourceOutremerId),
        creerSource("la_reunion_sites", vectorStr, pyloneSourceOutremerId),
        creerSource("2G_SRR_la_reunion", vectorStr, "mapbox://stephanedeboysson.2pz4w52d"),
        creerSource("2G3G_SRR_la_reunion", vectorStr, "mapbox://stephanedeboysson.2bo0cgx0"),// MAJ le 19/12/22
        creerSource("3G_SRR_la_reunion", vectorStr, "mapbox://stephanedeboysson.0s9yd7l0"),// MAJ le 10/08/22
        creerSource("4G_SRR_la_reunion", vectorStr, "mapbox://stephanedeboysson.17zzkcrt"), // MAJ le 16/11/22
        creerSource("2G_Orange_la_reunion", vectorStr, "mapbox://stephanedeboysson.4d4v073x"),// MAJ le 10/08/22
        creerSource("2G3G_Orange_la_reunion", vectorStr, "mapbox://stephanedeboysson.7564tqqn"),// MAJ le 10/08/22
        creerSource("3G_Orange_la_reunion", vectorStr, "mapbox://stephanedeboysson.49qbzm9y"),// MAJ le 10/08/22
        creerSource("4G_Orange_la_reunion", vectorStr, "mapbox://stephanedeboysson.7bdp15h2"), // MAJ le 16/11/22
        creerSource("2G_FM_la_reunion", vectorStr, "mapbox://stephanedeboysson.6x7yesss"),// MAJ le 19/12/22
        creerSource("2G3G_FM_la_reunion", vectorStr, "mapbox://stephanedeboysson.d0g3fe7q"),// MAJ le 19/12/22
        creerSource("3G_FM_la_reunion", vectorStr, "mapbox://stephanedeboysson.b0d3k9tn"),// MAJ le 10/08/22
        creerSource("4G_FM_la_reunion", vectorStr, "mapbox://stephanedeboysson.dzpdqtle"), // MAJ le 16/11/22
        creerSource("2G_Zeop_la_reunion", vectorStr, "mapbox://stephanedeboysson.dfgxz9cq"),// MAJ le 10/08/22
        creerSource("2G3G_Zeop_la_reunion", vectorStr, "mapbox://stephanedeboysson.1117r28t"),// MAJ le 10/08/22
        creerSource("3G_Zeop_la_reunion", vectorStr, "mapbox://stephanedeboysson.d8l1ivsa"),// MAJ le 10/08/22
        creerSource("4G_Zeop_la_reunion", vectorStr, "mapbox://stephanedeboysson.asmedc4j"), // MAJ le 16/11/22
        creerCompositeSources("2G_la_reunion", ["2G_SRR_la_reunion", "2G_Orange_la_reunion", "2G_FM_la_reunion", "2G_Zeop_la_reunion"]),
        creerCompositeSources("2G3G_la_reunion", ["2G3G_SRR_la_reunion", "2G3G_Orange_la_reunion", "2G3G_FM_la_reunion", "2G3G_Zeop_la_reunion"]),
        creerCompositeSources("3G_la_reunion", ["3G_SRR_la_reunion", "3G_Orange_la_reunion", "3G_FM_la_reunion", "3G_Zeop_la_reunion"]),
        creerCompositeSources("4G_la_reunion", ["4G_SRR_la_reunion", "4G_Orange_la_reunion", "4G_FM_la_reunion", "4G_Zeop_la_reunion"]),
        
        
        // Métropole
        creerSource("metropole_QoS_transports_data_arcep", vectorStr, "mapbox://stephanedeboysson.1565zjhb"), // prev : stephanedeboysson.077kv91f
        creerSource("metropole_QoS_transports_voix_arcep", vectorStr, "mapbox://stephanedeboysson.d1uticpn"), // prev : stephanedeboysson.1v8xuruj
        //creerSource("metropole_QoS_transports_data_sncf", vectorStr, "mapbox://stephanedeboysson.52uub4b1"),
        //creerSource("metropole_QoS_agglos_data_aura", vectorStr, "mapbox://stephanedeboysson.3xci447m"),
        creerSource("metropole_QoS_agglos_data_aura_2", vectorStr, "mapbox://stephanedeboysson.8tohk1tz"),
        //creerSource("metropole_QoS_agglos_data_cher", vectorStr, "mapbox://stephanedeboysson.d0ze8w92"),
        //creerSource("metropole_QoS_agglos_data_hdfDebits", vectorStr, "mapbox://stephanedeboysson.chjmjma0"),
        //creerSource("metropole_QoS_agglos_data_pdl2019", vectorStr, "mapbox://stephanedeboysson.07un1e4p"),
        //creerSource("metropole_QoS_agglos_data_pdl2020", vectorStr, "mapbox://stephanedeboysson.2ctyo9fy"),
        //creerSource("metropole_QoS_agglos_data_pdl2020_2", vectorStr, "mapbox://stephanedeboysson.9ubsga50"),
        creerSource("metropole_QoS_agglos_data_pdl2022_2", vectorStr, "mapbox://stephanedeboysson.3w8f0qyn"),
        creerSource("metropole_QoS_agglos_voix_pdl2022_3", vectorStr, "mapbox://stephanedeboysson.6s3jgpvd"), 
        creerSource("metropole_QoS_agglos_data_finistere_2022", vectorStr, "mapbox://stephanedeboysson.7lbjdme7"),
        creerSource("metropole_QoS_agglos_data_arcep", vectorStr, "mapbox://stephanedeboysson.55es7949"), // prev : stephanedeboysson.42ac4kba
        creerSource("metropole_QoS_agglos_voix_arcep", vectorStr, "mapbox://stephanedeboysson.6bvegvdh"), // prev : stephanedeboysson.7ygvm214
        //creerSource("metropole_QoS_agglos_data_lieusaint", vectorStr, "mapbox://stephanedeboysson.29cyraao"),
        creerSource("metropole_QoS_agglos_data_cd43", vectorStr, "mapbox://stephanedeboysson.bspc5lhw"),
        creerSource("metropole_QoS_agglos_data_qosi", vectorStr, "mapbox://stephanedeboysson.879e36sg"),
        creerSource("metropole_QoS_agglos_data_bfc", vectorStr, "mapbox://stephanedeboysson.48pfkxge"), // prev : stephanedeboysson.6af4i9pt
        creerSource("metropole_QoS_agglos_data_bfc2", vectorStr, "mapbox://stephanedeboysson.dm6zahio"),

        //test intégration crowd
        //creerSource("metropole_crowd_data_crowd1", vectorStr, "mapbox://stephanedeboysson.6af4i9pt"),

        // -- Mozark
        // - DL
        creerSource("metropole_crowd_data_crowd2", vectorStr, "mapbox://stephanedeboysson.7juxe614"),
        creerSource("guyane_crowd_data_crowd2", vectorStr, "mapbox://stephanedeboysson.6c28oxjl"),
        creerSource("guadeloupe_crowd_data_crowd2", vectorStr, "mapbox://stephanedeboysson.94mlq3dh"),
        creerSource("martinique_crowd_data_crowd2", vectorStr, "mapbox://stephanedeboysson.7ywt7er2"),
        creerSource("la_reunion_crowd_data_crowd2", vectorStr, "mapbox://stephanedeboysson.5zf4evc9"),
        // - WEB
        creerSource("metropole_crowd_data_crowd3", vectorStr, "mapbox://stephanedeboysson.2r13lu0x"),
        creerSource("guyane_crowd_data_crowd3", vectorStr, "mapbox://stephanedeboysson.7a2hh1tm"),
        creerSource("guadeloupe_crowd_data_crowd3", vectorStr, "mapbox://stephanedeboysson.dc63j03a"),
        creerSource("martinique_crowd_data_crowd3", vectorStr, "mapbox://stephanedeboysson.30uc6khb"),
        creerSource("la_reunion_crowd_data_crowd3", vectorStr, "mapbox://stephanedeboysson.7kyaevd2"),

        // -- Tadurezo
        // - DL
        creerSource("metropole_crowd_data_crowd4", vectorStr, "mapbox://stephanedeboysson.303l54yp"),
        // - WEB
        creerSource("metropole_crowd_data_crowd5", vectorStr, "mapbox://stephanedeboysson.3klmy7ce"),
        // -- Ca Capte ?
        // - DL
        creerSource("metropole_crowd_data_crowd6", vectorStr, "mapbox://stephanedeboysson.1aewn241"),
        // - WEB
        creerSource("metropole_crowd_data_crowd7", vectorStr, "mapbox://stephanedeboysson.9xn5lw2f"),
        // -- KiCapte
        // - DL
        creerSource("metropole_crowd_data_crowd8", vectorStr, "mapbox://stephanedeboysson.d6m4tnab"),
        // - WEB
        creerSource("metropole_crowd_data_crowd9", vectorStr, "mapbox://stephanedeboysson.6c5zlvgs"),

        // -- SpeedChecker
        creerSource("metropole_crowd_data_crowd1", vectorStr, "mapbox://stephanedeboysson.0dewbwbx"),
        //fin test intégration crowd

        //creerSource("metropole_sites", vectorStr, "mapbox://stephanedeboysson.0cpefa1t"),
        creerSource("metropole_sites", vectorStr, "mapbox://stephanedeboysson.175zk7g5"), // MAJ T4 30/03/2023
        //creerSource("metropole_sites", vectorStr, "mapbox://stephanedeboysson.74uy0p7u"),
        //creerSource("metropole_sites", vectorStr, "mapbox://stephanedeboysson.3juwz2fk"),
        //creerSource("metropole_sites", vectorStr, "mapbox://stephanedeboysson.4q0f89q7"),
        creerSource("metropole_touristique_text", vectorStr, "mapbox://stephanedeboysson.72t84b62"),
        creerSource("2G_Bouygues", vectorStr, "mapbox://stephanedeboysson.d5wpooir"),// MAJ T4 11/04/2023
        creerSource("2G_Free", vectorStr, "mapbox://stephanedeboysson.c323iooa"),// MAJ T4 11/04/2023
        creerSource("2G_Orange", vectorStr, "mapbox://stephanedeboysson.8wlxhkds"), // MAJ T4 11/04/2023
        creerSource("2G_SFR", vectorStr, "mapbox://stephanedeboysson.brc6xfe9"),// MAJ T4 11/04/2023
        // AJOUT 2G3G TEST
        creerSource("2G3G_Bouygues", vectorStr, "mapbox://stephanedeboysson.1ikcqal7"),// MAJ T4 11/04/2023 / T3 : mapbox://stephanedeboysson.3q3phwap / T4 : mapbox://stephanedeboysson.6cd1jv3e
        creerSource("2G3G_Free", vectorStr, "mapbox://stephanedeboysson.bt6bz2pc"),// MAJ T4 11/04/2023 / T3 : mapbox://stephanedeboysson.0jzr8zjn / T4 : mapbox://stephanedeboysson.2ne5m322
        creerSource("2G3G_Orange", vectorStr, "mapbox://stephanedeboysson.3entyi1s"),// MAJ T4 11/04/2023 / T3 : mapbox://stephanedeboysson.cvmryw6m / T4 : mapbox://stephanedeboysson.3entyi1
        creerSource("2G3G_SFR", vectorStr, "mapbox://stephanedeboysson.8v201qps"),// MAJ T4 11/04/2023 / T3 : mapbox://stephanedeboysson.211qkcvx / T4 : mapbox://stephanedeboysson.8v201qps
        // FIN TEST
        creerSource("3G_Bouygues", vectorStr, "mapbox://stephanedeboysson.8uc6jkp0"),// MAJ T4 11/04/2023
        creerSource("3G_Free", vectorStr, "mapbox://stephanedeboysson.3clr2rru"),// MAJ T4 11/04/2023
        creerSource("3G_Orange", vectorStr, "mapbox://stephanedeboysson.2egbcrjj"),// MAJ T4 11/04/2023
        creerSource("3G_SFR", vectorStr, "mapbox://stephanedeboysson.b314wio5"),// MAJ T4 11/04/2023 - stephanedeboysson.0uorwqa2
        creerSource("4G_Bouygues", vectorStr, "mapbox://stephanedeboysson.9wssz465"), // MAJ T4 11/04/2023
        creerSource("4G_Free", vectorStr, "mapbox://stephanedeboysson.2cvkpla7"), // MAJ T4 11/04/2023
        creerSource("4G_Orange", vectorStr, "mapbox://stephanedeboysson.1h9ww4if"), // MAJ T4 11/04/2023
        creerSource("4G_SFR", vectorStr, "mapbox://stephanedeboysson.6v87t0rm"), // MAJ T4 11/04/2023
        //creerSource("4G_Bouygues", vectorStr, "mapbox://stephanedeboysson.985b2pe5"),
        //creerSource("4G_Free", vectorStr, "mapbox://stephanedeboysson.aznh2stg"),
        //creerSource("4G_Orange", vectorStr, "mapbox://stephanedeboysson.7zcpjt0f"),
		//creerSource("4G_Orange_diff", vectorStr, "mapbox://stephanedeboysson.429nd7t3"),
        //creerSource("4G_SFR", vectorStr, "mapbox://stephanedeboysson.4akvz8qj"),
        creerCompositeSources("2G_metropole", ["2G_Bouygues", "2G_Free", "2G_Orange", "2G_SFR"]),
        // AJOUT 2G3G TEST
        creerCompositeSources("2G3G_metropole", ["2G3G_Bouygues", "2G3G_Free", "2G3G_Orange", "2G3G_SFR"]),
        //FIN TEST
        creerCompositeSources("3G_metropole", ["3G_Bouygues", "3G_Free", "3G_Orange", "3G_SFR"]),
        creerCompositeSources("4G_metropole", ["4G_Bouygues" ,"4G_Free", "4G_Orange", "4G_SFR"]),
        // TEST INTEGRATION DES TBDND
        creerSource("metropole_POI", vectorStr, "mapbox://stephanedeboysson.5xzsaqka"),
        creerSource("metropole_ARP", vectorStr, "mapbox://stephanedeboysson.bvnslimk"),
        creerSource("metropole_RAILS", vectorStr, "mapbox://stephanedeboysson.buhuc03u"),
        creerSource("metropole_ROADS_5G", vectorStr, "mapbox://stephanedeboysson.d8q79o92"),
    ],
    "layers": [
        // saint-barth
        creerLayer("stb_QoS_transports_voix_arcep", "stb_QoS_transports_voix_arcep", QoStransportsVoixLayerOutremerIdZAG, "numeric"),
        creerLayer("stb_QoS_transports_data_arcep", "stb_QoS_transports_data_arcep", QoStransportsDataLayerOutremerIdZAG, "numeric"),
        creerLayer("stb_QoS_agglos_voix_arcep", "stb_QoS_agglos_voix_arcep", QoSaggloVoixLayerOutremerIdZAG, "numeric"),
        creerLayer("stb_QoS_agglos_data_arcep", "stb_QoS_agglos_data_arcep", QoSaggloDataLayerOutremerIdZAG, "numeric"),
        creerLayer("stb_sites", "stb_sites", pyloneLayerOutremerId),
        creerLayerCouverture("2G_Digicel_stb", fillStr, "2G_stb", "STB_DIGIC_couv_2G_voix_2022_T4", multipleColorsDefault),// 12/04/23
        creerLayerCouverture("2G3G_Digicel_stb",fillStr,"2G3G_stb","STB_DIGIC_couv_2G3G_voix_2022_T4", multipleColorsDefault),// 12/04/23
        creerLayerCouverture("3G_Digicel_stb", fillStr, "3G_stb", "STB_DIGIC_couv_3G_data_2022_T4", monoColorDefault),// 12/04/23
		creerLayerCouverture("4G_Digicel_stb", fillStr, "4G_stb", "STB_DIGIC_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
        creerLayerCouverture("2G_Orange_stb", fillStr, "2G_stb", "STB_ORCA_couv_2G_voix_2022_T4", multipleColorsDefault),// 12/04/23
        creerLayerCouverture("2G3G_Orange_stb", fillStr,"2G3G_stb", "STB_ORCA_couv_2G3G_voix_2022_T4", multipleColorsDefault),// 12/04/23
        creerLayerCouverture("3G_Orange_stb", fillStr, "3G_stb", "STB_ORCA_couv_3G_data_2022_T4", monoColorDefault),// 12/04/23
        creerLayerCouverture("4G_Orange_stb", fillStr, "4G_stb", "STB_ORCA_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
        //creerLayerCouverture("2G_frca_stb", fillStr, "2G_stb", "STB_frca_couv_2G_voix_2020_T2", multipleColorsDefault), **pas de données au T42 020
        creerLayerCouverture("2G3G_FM_stb",fillStr,"2G3G_stb", "STB_FRCA_couv_2G3G_voix_2022_T4", multipleColorsDefault),// 12/04/23 
        creerLayerCouverture("3G_FM_stb", fillStr, "3G_stb", "STB_FRCA_couv_3G_data_2022_T4", monoColorDefault),// 12/04/23 
        creerLayerCouverture("4G_FM_stb", fillStr, "4G_stb", "STB_FRCA_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
        //creerLayerCouverture("2G_DT_stb", fillStr, "2G_stb", "STB_DAUPH_couv_2G_voix_2020_T2", multipleColorsDefault), **pas de données au T42 020
        creerLayerCouverture("2G3G_DT_stb",fillStr,"2G3G_stb", "STB_DAUPH_couv_2G3G_voix_2022_T4", multipleColorsDefault),// 12/04/23
        creerLayerCouverture("3G_DT_stb", fillStr, "3G_stb", "STB_DAUPH_couv_3G_data_2022_T4", monoColorDefault),// 12/04/23
        creerLayerCouverture("4G_DT_stb", fillStr, "4G_stb", "STB_DAUPH_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
        //creerLayerCouverture("3G_UTS_stb", fillStr, "3G_stb", "STB_UTS_couv_3G_data_2019_T2", monoColorDefault), **UTS a rendu les fréquences donc normalement plus à afficher
       
       
        //STM
        creerLayer("stm_QoS_transports_voix_arcep", "stm_QoS_transports_voix_arcep", QoStransportsVoixLayerOutremerIdZAG, "numeric"),
        creerLayer("stm_QoS_transports_data_arcep", "stm_QoS_transports_data_arcep", QoStransportsDataLayerOutremerIdZAG, "numeric"),
        creerLayer("stm_QoS_agglos_voix_arcep", "stm_QoS_agglos_voix_arcep", QoSaggloVoixLayerOutremerIdZAG, "numeric"),
        creerLayer("stm_QoS_agglos_data_arcep", "stm_QoS_agglos_data_arcep", QoSaggloDataLayerOutremerIdZAG, "numeric"),
        //creerLayer("stm_sites", "STM_sites", "sites_STM-3iilnf"),
        creerLayer("stm_sites", "stm_sites", pyloneLayerOutremerId),
        creerLayerCouverture("2G_Digicel_stm", fillStr, "2G_stm", "STM_DIGIC_couv_2G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("2G3G_Digicel_stm", fillStr, "2G3G_stm", "STM_DIGIC_couv_2G3G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("3G_Digicel_stm", fillStr, "3G_stm", "STM_DIGIC_couv_3G_data_2022_T4", monoColorDefault),// maj le 12/04/23
		creerLayerCouverture("4G_Digicel_stm", fillStr, "4G_stm", "STM_DIGIC_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
        creerLayerCouverture("2G_Orange_stm", fillStr, "2G_stm", "STM_ORCA_couv_2G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("2G3G_Orange_stm", fillStr, "2G3G_stm","STM_ORCA_couv_2G3G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("3G_Orange_stm", fillStr, "3G_stm", "STM_ORCA_couv_3G_data_2022_T4", monoColorDefault),// maj le 12/04/23
        creerLayerCouverture("4G_Orange_stm", fillStr, "4G_stm", "STM_ORCA_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
        //creerLayerCouverture("2G_frca_stm", fillStr, "2G_stm", "STM_frca_couv_2G_voix_2020_T2", multipleColorsDefault), **pas de données au T42 020
        creerLayerCouverture("2G3G_FM_stm",fillStr,"2G3G_stm", "STM_FRCA_couv_2G3G_voix_2022_T4", multipleColorsDefault),// 12/04/23 
        creerLayerCouverture("3G_FM_stm", fillStr, "3G_stm", "STM_FRCA_couv_3G_data_2022_T4", monoColorDefault),// 12/04/23 
        creerLayerCouverture("4G_FM_stm", fillStr, "4G_stm", "STM_FRCA_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
        //creerLayerCouverture("2G_DT_stm", fillStr, "2G_stm", "STM_DAUPH_couv_2G_voix_2020_T2", multipleColorsDefault), **eteint la 2G au T3 2020
        creerLayerCouverture("2G3G_DT_stm", fillStr, "2G3G_stm", "STM_DAUPH_couv_2G3G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("3G_DT_stm", fillStr, "3G_stm", "STM_DAUPH_couv_3G_data_2022_T4", monoColorDefault),// maj le 12/04/23
        creerLayerCouverture("4G_DT_stm", fillStr, "4G_stm", "STM_DAUPH_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
        creerLayerCouverture("2G3G_UTS_stm", fillStr, "2G3G_stm", "STM_UTS_couv_2G3G_voix_2022_T4", monoColorDefault),// maj le 12/04/23
        creerLayerCouverture("3G_UTS_stm", fillStr, "3G_stm", "STM_UTS_couv_3G_data_2022_T4", monoColorDefault),// maj le 12/04/23
        creerLayerCouverture("4G_UTS_stm", fillStr, "4G_stm", "STM_UTS_couv_4G_data_2022_T4", monoColorDefault),// 12/04/23

        
        
        // Guadeloupe
        creerLayer("guadeloupe_QoS_transports_voix_arcep", "guadeloupe_QoS_transports_voix_arcep", QoStransportsVoixLayerOutremerIdZAG, "numeric"),
        creerLayer("guadeloupe_QoS_transports_data_arcep", "guadeloupe_QoS_transports_data_arcep", QoStransportsDataLayerOutremerIdZAG, "numeric"),
        
        //version en ligne
        //creerLayer("guadeloupe_QoS_agglos_voix_arcep", "guadeloupe_QoS_agglos_voix_arcep", "QoS_Guadeloupe_Agglos_voix-b5ez5h"),
        //creerLayer("guadeloupe_QoS_agglos_data_arcep", "guadeloupe_QoS_agglos_data_arcep", "QoS_Guadeloupe_Agglos_data-8weccw"),
        
        // version OK NOK succès 3G et 4G
        //creerLayer("guadeloupe_QoS_agglos_voix_arcep", "guadeloupe_QoS_agglos_voix_arcep", "QoS_Guadeloupe_Agglos_voix-b5ez5h"),
        //creerLayer("guadeloupe_QoS_agglos_data_arcep", "guadeloupe_QoS_agglos_data_arcep", "QoS_GUA_Agglos_data_4"),
        
        
        // version 0 et 1 numeric
        creerLayer("guadeloupe_QoS_agglos_voix_arcep", "guadeloupe_QoS_agglos_voix_arcep", QoSaggloVoixLayerOutremerIdZAG, "numeric"),
        creerLayer("guadeloupe_QoS_agglos_data_arcep", "guadeloupe_QoS_agglos_data_arcep", QoSaggloDataLayerOutremerIdZAG, "numeric"),

        //creerLayer("guadeloupe_sites", "guadeloupe_sites", "sites_Guadeloupe-3iilnf"),
        creerLayer("guadeloupe_sites", "guadeloupe_sites", pyloneLayerOutremerId),
        creerLayerCouverture("2G_Digicel_guadeloupe", fillStr, "2G_guadeloupe", "GUA_DIGIC_couv_2G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("2G3G_Digicel_guadeloupe",fillStr,"2G3G_guadeloupe", "GUA_DIGIC_couv_2G3G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("3G_Digicel_guadeloupe", fillStr, "3G_guadeloupe", "GUA_DIGIC_couv_3G_data_2022_T4", monoColorDefault),// maj le 12/04/23
		creerLayerCouverture("4G_Digicel_guadeloupe", fillStr, "4G_guadeloupe", "GUA_DIGIC_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
        creerLayerCouverture("2G_Orange_guadeloupe", fillStr, "2G_guadeloupe", "GUA_ORCA_couv_2G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("2G3G_Orange_guadeloupe", fillStr, "2G3G_guadeloupe", "GUA_ORCA_couv_2G3G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("3G_Orange_guadeloupe", fillStr, "3G_guadeloupe", "GUA_ORCA_couv_3G_data_2022_T4", monoColorDefault),// maj le 12/04/23
        creerLayerCouverture("4G_Orange_guadeloupe", fillStr, "4G_guadeloupe", "GUA_ORCA_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
        //creerLayerCouverture("2G_frca_guadeloupe", fillStr, "2G_guadeloupe", "GUA_frca_couv_2G_voix_2020_T2", multipleColorsDefault), **pas de données au T42 020
        creerLayerCouverture("2G3G_FM_guadeloupe",fillStr,"2G3G_guadeloupe", "GUA_FRCA_couv_2G3G_voix_2022_T4", multipleColorsDefault),// 12/04/23 
        creerLayerCouverture("3G_FM_guadeloupe", fillStr, "3G_guadeloupe", "GUA_FRCA_couv_3G_data_2022_T4", monoColorDefault),// 12/04/23 
        creerLayerCouverture("4G_FM_guadeloupe", fillStr, "4G_guadeloupe", "GUA_FRCA_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23  
        creerLayerCouverture("2G_OMT_guadeloupe", fillStr, "2G_guadeloupe", "GUA_OMT_couv_2G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("2G3G_OMT_guadeloupe", fillStr, "2G3G_guadeloupe", "GUA_OMT_couv_2G3G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("3G_OMT_guadeloupe", fillStr, "3G_guadeloupe", "GUA_OMT_couv_3G_data_2022_T4", monoColorDefault),// maj le 12/04/23
        creerLayerCouverture("4G_OMT_guadeloupe", fillStr, "4G_guadeloupe", "GUA_OMT_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
        
        
        // Guyane
        creerLayer("guyane_QoS_transports_voix_arcep", "guyane_QoS_transports_voix_arcep", QoStransportsVoixLayerOutremerIdZAG, "numeric"),
        creerLayer("guyane_QoS_transports_data_arcep", "guyane_QoS_transports_data_arcep", QoStransportsDataLayerOutremerIdZAG, "numeric"),
        creerLayer("guyane_QoS_agglos_voix_arcep", "guyane_QoS_agglos_voix_arcep", QoSaggloVoixLayerOutremerIdZAG, "numeric"),
        creerLayer("guyane_QoS_agglos_data_arcep", "guyane_QoS_agglos_data_arcep", QoSaggloDataLayerOutremerIdZAG, "numeric"),
        //creerLayer("guyane_sites", "guyane_sites", "sites_Guyane-ad8epo"),
        creerLayer("guyane_sites", "guyane_sites", pyloneLayerOutremerId),
        creerLayerCouverture("2G_Digicel_guyane", fillStr, "2G_guyane", "GUY_DIGIC_couv_2G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("2G3G_Digicel_guyane", fillStr, "2G3G_guyane", "GUY_DIGIC_couv_2G3G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("3G_Digicel_guyane", fillStr, "3G_guyane", "GUY_DIGIC_couv_3G_data_2022_T4", monoColorDefault),// maj le 12/04/23
		creerLayerCouverture("4G_Digicel_guyane", fillStr, "4G_guyane", "GUY_DIGIC_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
        creerLayerCouverture("2G_Orange_guyane", fillStr, "2G_guyane", "GUY_ORCA_couv_2G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("2G3G_Orange_guyane", fillStr, "2G3G_guyane", "GUY_ORCA_couv_2G3G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("3G_Orange_guyane", fillStr, "3G_guyane", "GUY_ORCA_couv_3G_data_2022_T4", monoColorDefault),// maj le 12/04/23
        creerLayerCouverture("4G_Orange_guyane", fillStr, "4G_guyane", "GUY_ORCA_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
        //creerLayerCouverture("2G_frca_guyane", fillStr, "2G_guyane", "STB_frca_couv_2G_voix_2020_T2", multipleColorsDefault), **pas de données au T42 020
        creerLayerCouverture("2G3G_FM_guyane",fillStr,"2G3G_guyane", "GUY_FRCA_couv_2G3G_voix_2022_T4", multipleColorsDefault),// 12/04/23 
        creerLayerCouverture("3G_FM_guyane", fillStr, "3G_guyane", "GUY_FRCA_couv_3G_data_2022_T4", monoColorDefault),// 12/04/23 
        creerLayerCouverture("4G_FM_guyane", fillStr, "4G_guyane", "GUY_FRCA_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
        creerLayerCouverture("2G_OMT_guyane", fillStr, "2G_guyane", "GUY_OMT_couv_2G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("2G3G_OMT_guyane", fillStr, "2G3G_guyane", "GUY_OMT_couv_2G3G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("3G_OMT_guyane", fillStr, "3G_guyane", "GUY_OMT_couv_3G_data_2022_T4", monoColorDefault),// maj le 12/04/23
        creerLayerCouverture("4G_OMT_guyane", fillStr, "4G_guyane", "GUY_OMT_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
       
       
        // Martinique
        creerLayer("martinique_QoS_transports_voix_arcep", "martinique_QoS_transports_voix_arcep", QoStransportsVoixLayerOutremerIdZAG, "numeric"),
        creerLayer("martinique_QoS_transports_data_arcep", "martinique_QoS_transports_data_arcep", QoStransportsDataLayerOutremerIdZAG, "numeric"),
        creerLayer("martinique_QoS_agglos_voix_arcep", "martinique_QoS_agglos_voix_arcep", QoSaggloVoixLayerOutremerIdZAG, "numeric"),
        creerLayer("martinique_QoS_agglos_data_arcep", "martinique_QoS_agglos_data_arcep", QoSaggloDataLayerOutremerIdZAG, "numeric"),
        //creerLayer("martinique_sites", "martinique_sites", "sites_Martinique-2psska"),
        creerLayer("martinique_sites", "martinique_sites", pyloneLayerOutremerId),
        creerLayerCouverture("2G_Digicel_martinique", fillStr, "2G_martinique", "MAR_DIGIC_couv_2G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("2G3G_Digicel_martinique", fillStr, "2G3G_martinique", "MAR_DIGIC_couv_2G3G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("3G_Digicel_martinique", fillStr, "3G_martinique", "MAR_DIGIC_couv_3G_data_2022_T4", monoColorDefault),// maj le 12/04/23
		creerLayerCouverture("4G_Digicel_martinique", fillStr, "4G_martinique", "MAR_DIGIC_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
        creerLayerCouverture("2G_Orange_martinique", fillStr, "2G_martinique", "MAR_ORCA_couv_2G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("2G3G_Orange_martinique", fillStr, "2G3G_martinique", "MAR_ORCA_couv_2G3G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("3G_Orange_martinique", fillStr, "3G_martinique", "MAR_ORCA_couv_3G_data_2022_T4", monoColorDefault),// maj le 12/04/23
        creerLayerCouverture("4G_Orange_martinique", fillStr, "4G_martinique", "MAR_ORCA_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
        //creerLayerCouverture("2G_frca_stb", fillStr, "2G_martinique", "MAR_frca_couv_2G_voix_2020_T2", multipleColorsDefault), **pas de données au T42 020
        creerLayerCouverture("2G3G_FM_martinique",fillStr,"2G3G_martinique", "MAR_FRCA_couv_2G3G_voix_2022_T4", multipleColorsDefault),// 12/04/23 
        creerLayerCouverture("3G_FM_martinique", fillStr, "3G_martinique", "MAR_FRCA_couv_3G_data_2022_T4", monoColorDefault),// 12/04/23 
        creerLayerCouverture("4G_FM_martinique", fillStr, "4G_martinique", "MAR_FRCA_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
        creerLayerCouverture("2G_OMT_martinique", fillStr, "2G_martinique", "MAR_OMT_couv_2G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("2G3G_OMT_martinique", fillStr, "2G3G_martinique", "MAR_OMT_couv_2G3G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("3G_OMT_martinique", fillStr, "3G_martinique", "MAR_OMT_couv_3G_data_2022_T4", monoColorDefault),// maj le 12/04/23
        creerLayerCouverture("4G_OMT_martinique", fillStr, "4G_martinique", "MAR_OMT_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
       
       
        // Mayotte
        creerLayer("mayotte_QoS_transports_voix_arcep", "mayotte_QoS_transports_voix_arcep", QoStransportsVoixLayerOutremerId, "numeric"),
        creerLayer("mayotte_QoS_transports_data_arcep", "mayotte_QoS_transports_data_arcep", QoStransportsDataLayerOutremerId, "numeric"),
        creerLayer("mayotte_QoS_agglos_voix_arcep", "mayotte_QoS_agglos_voix_arcep", QoSaggloVoixLayerOutremerId, "numeric"),
        creerLayer("mayotte_QoS_agglos_data_arcep", "mayotte_QoS_agglos_data_arcep", QoSaggloDataLayerOutremerId, "numeric"),
        creerLayer("mayotte_sites", "mayotte_sites", pyloneLayerOutremerId),
        //creerLayerCouverture("2G_BJT_mayotte", fillStr, "2G_mayotte", "MAY_BJTP_couv_2G_voix_2019_T4", multipleColorsDefault), **Maore Mobile n'a pas envoyé de carte T2 2020
        //creerLayerCouverture("2G_BJT_mayotte", fillStr, "2G_mayotte", "MAY_MAOR_couv_2G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        //creerLayerCouverture("2G3G_BJT_mayotte", fillStr, "2G3G_mayotte", "MAY_MAOR_couv_2G3G_voix_2022_T4", multipleColorsDefault), // maj le 12/04/23
        //creerLayerCouverture("4G_BJT_mayotte", fillStr, "4G_mayotte", "MAY_MAOR_couv_4G_data_2022_T4", monoColorDefault), // maj le 12/04/23
        creerLayerCouverture("2G_SRR_mayotte", fillStr, "2G_mayotte", "MAY_SRR_couv_2G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("2G3G_SRR_mayotte", fillStr, "2G3G_mayotte", "MAY_SRR_couv_2G3G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("3G_SRR_mayotte", fillStr, "3G_mayotte", "MAY_SRR_couv_3G_data_2022_T4", monoColorDefault),// maj le 12/04/23
        creerLayerCouverture("4G_SRR_mayotte", fillStr, "4G_mayotte", "MAY_SRR_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
        creerLayerCouverture("2G_FM_mayotte", fillStr, "2G_mayotte", "MAY_TELC_couv_2G_voix_2022_T4", multipleColorsDefault),// maj le 19/12/2022
        creerLayerCouverture("2G3G_FM_mayotte", fillStr, "2G3G_mayotte", "MAY_TELC_couv_2G3G_voix_2022_T4", multipleColorsDefault),// maj le 19/12/2022
        creerLayerCouverture("3G_FM_mayotte", fillStr, "3G_mayotte", "MAY_TELC_couv_3G_data_2022_T4", monoColorDefault),// maj le 12/04/23
        creerLayerCouverture("4G_FM_mayotte", fillStr, "4G_mayotte", "MAY_TELC_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
        creerLayerCouverture("2G_Orange_mayotte", fillStr, "2G_mayotte", "MAY_OF_couv_2G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("2G3G_Orange_mayotte", fillStr, "2G3G_mayotte", "MAY_OF_couv_2G3G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("3G_Orange_mayotte", fillStr, "3G_mayotte", "MAY_OF_couv_3G_data_2022_T4", monoColorDefault),// maj le 12/04/23
        creerLayerCouverture("4G_Orange_mayotte", fillStr, "4G_mayotte", "MAY_OF_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
        
   
        // La Réunion
        creerLayer("la_reunion_QoS_transports_voix_arcep", "la_reunion_QoS_transports_voix_arcep", QoStransportsVoixLayerOutremerId, "numeric"),
        creerLayer("la_reunion_QoS_transports_data_arcep", "la_reunion_QoS_transports_data_arcep", QoStransportsDataLayerOutremerId, "numeric"),
        creerLayer("la_reunion_QoS_agglos_voix_arcep", "la_reunion_QoS_agglos_voix_arcep", QoSaggloVoixLayerOutremerId, "numeric"),
        creerLayer("la_reunion_QoS_agglos_data_arcep", "la_reunion_QoS_agglos_data_arcep", QoSaggloDataLayerOutremerId, "numeric"),
        creerLayer("la_reunion_sites", "la_reunion_sites", pyloneLayerOutremerId),
        //creerLayer("la_reunion_sites", "la_reunion_sites", "REU_sites_T4_2020"),
        creerLayerCouverture("2G_SRR_la_reunion", fillStr, "2G_la_reunion", "REU_SRR_couv_2G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("2G3G_SRR_la_reunion", fillStr, "2G3G_la_reunion", "REU_SRR_couv_2G3G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("3G_SRR_la_reunion", fillStr, "3G_la_reunion", "REU_SRR_couv_3G_data_2022_T4", monoColorDefault),// maj le 12/04/23
        creerLayerCouverture("4G_SRR_la_reunion", fillStr, "4G_la_reunion", "REU_SRR_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
        creerLayerCouverture("2G_Orange_la_reunion", fillStr, "2G_la_reunion", "REU_OF_couv_2G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("2G3G_Orange_la_reunion", fillStr, "2G3G_la_reunion", "REU_OF_couv_2G3G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("3G_Orange_la_reunion", fillStr, "3G_la_reunion", "REU_OF_couv_3G_data_2022_T4", monoColorDefault),// maj le 12/04/23
        creerLayerCouverture("4G_Orange_la_reunion", fillStr, "4G_la_reunion", "REU_OF_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
        creerLayerCouverture("2G_FM_la_reunion", fillStr, "2G_la_reunion", "REU_TELC_couv_2G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("2G3G_FM_la_reunion", fillStr, "2G3G_la_reunion", "REU_TELC_couv_2G3G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("3G_FM_la_reunion", fillStr, "3G_la_reunion", "REU_TELC_couv_3G_data_2022_T4", monoColorDefault),// maj le 12/04/23
        creerLayerCouverture("4G_FM_la_reunion", fillStr, "4G_la_reunion", "REU_TELC_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
        creerLayerCouverture("2G_Zeop_la_reunion", fillStr, "2G_la_reunion", "REU_ZEOP_couv_2G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("2G3G_Zeop_la_reunion", fillStr, "2G3G_la_reunion", "REU_ZEOP_couv_2G3G_voix_2022_T4", multipleColorsDefault),// maj le 12/04/23
        creerLayerCouverture("3G_Zeop_la_reunion", fillStr, "3G_la_reunion", "REU_ZEOP_couv_3G_data_2022_T4", monoColorDefault),// maj le 12/04/23
        creerLayerCouverture("4G_Zeop_la_reunion", fillStr, "4G_la_reunion", "REU_ZEOP_couv_4G_data_2022_T4", monoColorDefault), // 12/04/23
       
       
        // Métropole
        creerLayer("metropole_QoS_transports_voix_arcep", "metropole_QoS_transports_voix_arcep", "Carto_Axes_2022", "numeric"), // prev : CAMPAGNE_VOIX_TRANSPORTS_T3_2021
        creerLayer("metropole_QoS_transports_data_arcep", "metropole_QoS_transports_data_arcep", "carto_axes_web_MRM", "numeric"), // prev : CAMPAGNE_DATA_TRANSPORTS
        creerLayer("metropole_QoS_agglos_data_arcep", "metropole_QoS_agglos_data_arcep", "carto_agglos_web", "numeric"), // prev : CAMPAGNE_DATA_L2V_T3_2021
		creerLayer("metropole_QoS_agglos_voix_arcep", "metropole_QoS_agglos_voix_arcep", "carto_agglo_voix", "numeric"), // prev : QoS_Arcep_habitations_voixsms_2020

        //creerLayer("metropole_QoS_transports_data_sncf", "metropole_QoS_transports_data_sncf", "MRM_web_sncf_QoSi_T2_2020"),
        //creerLayer("metropole_QoS_agglos_data_aura", "metropole_QoS_agglos_data_aura", "MRM_Aura_data_final", "continuous"),
        creerLayer("metropole_QoS_agglos_data_aura_2", "metropole_QoS_agglos_data_aura_2", "MRM_Aura_2020_10_debits", "continuous"),
        //creerLayer("metropole_QoS_agglos_data_cher", "metropole_QoS_agglos_data_cher", "MRM_WEB_Cher_data_routes", "numeric"),
        //creerLayer("metropole_QoS_agglos_data_hdfDebits", "metropole_QoS_agglos_data_hdfDebits", "HDF_donnees_MRM", "continuous"),
        //creerLayer("metropole_QoS_agglos_data_pdl2019", "metropole_QoS_agglos_data_pdl2019", "MRM_PDlL_WEB_janvier2019"),
        //creerLayer("metropole_QoS_agglos_data_pdl2020", "metropole_QoS_agglos_data_pdl2020", "MRM_PDlL_debit_2020T1", "continuous"),
        //creerLayer("metropole_QoS_agglos_data_pdl2020_2", "metropole_QoS_agglos_data_pdl2020_2", "PDlL_mai_septembre2020_all_DL", "continuous"),
        creerLayer("metropole_QoS_agglos_data_pdl2022_2", "metropole_QoS_agglos_data_pdl2022_2", "Gigalis_data-7t1whr", "continuous"),
        creerLayer("metropole_QoS_agglos_voix_pdl2022_3", "metropole_QoS_agglos_voix_pdl2022_3", "Gigalis_voix-3l0mdg", "numeric"),
        creerLayer("metropole_QoS_agglos_data_finistere_2022", "metropole_QoS_agglos_data_finistere_2022", "Finistere_EM_DL-68y1t2", "continuous"),
        //creerLayer("metropole_QoS_agglos_data_lieusaint", "metropole_QoS_agglos_data_lieusaint", "MRM_Lieusaint_T2_2020", "numeric"),
        creerLayer("metropole_QoS_agglos_data_cd43", "metropole_QoS_agglos_data_cd43", "MRM_Haute_Loire_T1_2020", "continuous"),
        creerLayer("metropole_QoS_agglos_data_qosi", "metropole_QoS_agglos_data_qosi", "MRM_5Gmark_juillet_decembre_2020_debits", "continuous"),
        creerLayer("metropole_QoS_agglos_data_bfc", "metropole_QoS_agglos_data_bfc", "BFC_drivetests_DL", "continuous"), // prev : MRM_BFC_debits_T3_2020_juin2021
        creerLayer("metropole_QoS_agglos_data_bfc2", "metropole_QoS_agglos_data_bfc2", "BFC_drivetests_WEB", "numeric"),
        
        //test intégration crowd
        //creerLayer("metropole_crowd_data_crowd1", "metropole_crowd_data_crowd1", "MRM_BFC_debits_T3_2020_juin2021", "continuous"),

        // -- Mozark
        // - DL
        creerLayer("metropole_crowd_data_crowd2", "metropole_crowd_data_crowd2", "Mozark_DL_FR_T3_2021", "continuous"),
        creerLayer("guyane_crowd_data_crowd2", "guyane_crowd_data_crowd2", "Mozark_DL_GF_T3_2021", "continuous"),
        creerLayer("guadeloupe_crowd_data_crowd2", "guadeloupe_crowd_data_crowd2", "Mozark_DL_GP_T3_2021", "continuous"),
        creerLayer("martinique_crowd_data_crowd2", "martinique_crowd_data_crowd2", "Mozark_DL_MQ_T3_2021", "continuous"),
        creerLayer("la_reunion_crowd_data_crowd2", "la_reunion_crowd_data_crowd2", "Mozark_DL_RE_T3_2021", "continuous"),
        // - WEB
        creerLayer("metropole_crowd_data_crowd3", "metropole_crowd_data_crowd3", "Mozark_WEB_FR_T3_2021", "numeric"),
        creerLayer("guyane_crowd_data_crowd3", "guyane_crowd_data_crowd3", "Mozark_WEB_GF_T3_2021", "numeric"),
        creerLayer("guadeloupe_crowd_data_crowd3", "guadeloupe_crowd_data_crowd3", "Mozark_WEB_GP_T3_2021", "numeric"),
        creerLayer("martinique_crowd_data_crowd3", "martinique_crowd_data_crowd3", "Mozark_WEB_MQ_T3_2021", "numeric"),
        creerLayer("la_reunion_crowd_data_crowd3", "la_reunion_crowd_data_crowd3", "Mozark_WEB_RE_T3_2021", "numeric"),

        // -- Tadurezo
        // - DL
        creerLayer("metropole_crowd_data_crowd4", "metropole_crowd_data_crowd4", "Tadurezo_DL_14_04_2022-a6um69", "continuous"),
        // - WEB
        creerLayer("metropole_crowd_data_crowd5", "metropole_crowd_data_crowd5", "Tadurezo_WEB_15_04_2022-az4q3f", "numeric"),
        // -- KiCapte
        // - DL
        creerLayer("metropole_crowd_data_crowd8", "metropole_crowd_data_crowd8", "Kicapte_DL-1saj49", "continuous"),
        // - WEB
        creerLayer("metropole_crowd_data_crowd9", "metropole_crowd_data_crowd9", "Kicapte_WEB-4nftvi", "numeric"),
        // -- Ca capte ?
        // - DL
        creerLayer("metropole_crowd_data_crowd6", "metropole_crowd_data_crowd6", "Finistre_dl_mapbox-6fg278", "continuous"),
        // - WEB
        creerLayer("metropole_crowd_data_crowd7", "metropole_crowd_data_crowd7", "Finistre_web_mapbox-bstdf0", "numeric"),  

        // -- Speedchecker
        creerLayer("metropole_crowd_data_crowd1", "metropole_crowd_data_crowd1", "2022_T3_Speedchecker_mapbox-8l7w3g", "continuous"),
        //fin test intégration crowd

        //creerLayer("metropole_sites", "metropole_sites", "2022_T3_Sites_Metro_MRM_WGS84-bmf58h"),
        creerLayer("metropole_sites", "metropole_sites", "METRO_sites_MRM_2022_T4-c5bkwg"), // MP_sites_Metropole_T4_2022-4cy3or
        //creerLayer("metropole_sites", "metropole_sites", "METRO_Sites_2020_T1-cz8tqr"),
        //creerLayer("metropole_sites", "metropole_sites", "2019_T4_Liste_sites_operateur-10jko0"),
        //creerLayer("metropole_sites", "metropole_sites", "2019_T3_Liste_sites_operateur-ddy13n"),
        creerLayer("metropole_touristique_text", "metropole_touristique_text", "Points_touristiques-acokra", "text"),
        creerLayerCouverture("2G_Bouygues_metropole", fillStr, "2G_metropole", "METRO_BOUY_couv_2G_voix_2022_T4", multipleColorsDefault),
        creerLayerCouverture("2G_Free_metropole", fillStr, "2G_metropole", "METRO_FREE_couv_2G_voix_2022_T4", multipleColorsDefault),
        creerLayerCouverture("2G_Orange_metropole", fillStr, "2G_metropole", "METRO_OF_couv_2G_voix_2022_T4", multipleColorsDefault),
        creerLayerCouverture("2G_SFR_metropole", fillStr, "2G_metropole", "METRO_SFR0_couv_2G_voix_2022_T4", multipleColorsDefault),
        // AJOUT 2G3G TEST
        creerLayerCouverture("2G3G_Bouygues_metropole", fillStr, "2G3G_metropole", "METRO_BOUY_couv_2G3G_voix_2022_T4", multipleColorsDefault), // T4 : METRO_BOUY_couv_2G3G_voix_2022_T4 - T3 : METRO_BOUY_couv_2G3G_voix_2022_T2
        creerLayerCouverture("2G3G_Free_metropole", fillStr, "2G3G_metropole", "METRO_FREE_couv_2G3G_voix_2022_T4", multipleColorsDefault), // T4 : METRO_FREE_couv_2G3G_voix_2022_T4 - T3 : METRO_FREE_couv_2G3G_voix_2022_T2
        creerLayerCouverture("2G3G_Orange_metropole", fillStr, "2G3G_metropole", "METRO_OF_couv_2G3G_voix_2022_T4", multipleColorsDefault), // T4 : METRO_OF_couv_2G3G_voix_2022_T4 - T3 : METRO_OF_couv_2G3G_voix_2022_T2
        creerLayerCouverture("2G3G_SFR_metropole", fillStr, "2G3G_metropole", "METRO_SFR0_couv_2G3G_voix_2022_T4", multipleColorsDefault), // T4 : METRO_SFR0_couv_2G3G_voix_2022_T4 - T3 : METRO_SFR0_couv_2G3G_voix_2022_T2
        // FIN TEST
        creerLayerCouverture("3G_Bouygues_metropole", fillStr, "3G_metropole", "METRO_BOUY_couv_3G_data_2022_T4", monoColorDefault),
        creerLayerCouvertureItinerance("3G_Free_metropole", fillStr, "3G_metropole", "METRO_FREE_couv_3G_data_2022_T4", ['#efa7a7', '#e36565'], itineranceColDefault, itineranceDefault, 0.5),
        creerLayerCouverture("3G_Orange_metropole", fillStr, "3G_metropole", "METRO_OF_couv_3G_data_2022_T4", monoColorDefault),
        creerLayerCouverture("3G_SFR_metropole", fillStr, "3G_metropole", "METRO_SFR0_couv_3G_data_2022_T4", monoColorDefault),
        creerLayerCouverture("4G_Bouygues_metropole", fillStr, "4G_metropole", "METRO_BOUY_couv_4G_data_2022_T4", monoColorDefault), // 10/05/2022
        creerLayerCouverture("4G_Free_metropole", fillStr, "4G_metropole", "METRO_FREE_couv_4G_data_2022_T4", monoColorDefault), // 10/05/2022
        creerLayerCouverture("4G_Orange_metropole", fillStr, "4G_metropole", "METRO_OF_couv_4G_data_2022_T4", monoColorDefault), // 10/05/2022
        creerLayerCouverture("4G_SFR_metropole", fillStr, "4G_metropole", "METRO_SFR0_couv_4G_data_2022_T4", monoColorDefault), // 10/05/2022
        // TEST INTEGRATION DES TBDND
        creerLayer("metropole_POI", "metropole_POI", "2022_T4_dcc_Metropole_POI_MRM-cqa5tc"),
        creerLayer("metropole_ARP", "metropole_ARP", "2020_06_ARP_WGS84-5hmd3v"),
        creerLayer("metropole_RAILS", "metropole_RAILS", "Axes_ferres-669fmu"),
        creerLayer("metropole_ROADS_5G", "metropole_ROADS_5G", "Axes_5G-9z8svl"),
    ],
    "sourcesHashTable": {},
    "layersHashTable" : {}
};

mbData.sourcesHashTable = mbData.sources.reduce(buildHashTable, {});
mbData.layersHashTable = mbData.layers.reduce(buildHashTable, {});
