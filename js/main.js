
let errorTableXml, symbolTableXml;
let errorTableXpath, tokenTableXpath;
let xmlEditor, xpathEditor, consoleResult, grammarReport;

let dotStringCst = "", dotStringAst = '', count_temp = 0;


$(document).ready(function () {

  errorTableXml = $('#errorTableXml').DataTable();
  symbolTableXml = $('#symbolTableXml').DataTable();
  errorTableXpath = $('#errorTableXpath').DataTable();
  tokenTableXpath = $('#tokenTableXpath').DataTable();

  $('.tabs').tabs();
  $("select").formSelect();
  $('.tooltipped').tooltip();

  xmlEditor = editor('xml__editor', 'java');
  consoleResult = editor('console__result', 'java');
  //consoleResult = editor('console__result', '', false, true, false);
  grammarReport = editor('grammar__report__editor', 'xml', false, true, false);
});

/**
 * create a new instance of codemirror
 * @param {*} id            id from textarea
 * @param {*} language      lenguage highlighter
 * @param {*} lineNumbers   true = show line numbers; false: not show line numbers; default = true
 * @param {*} readOnly      true = the editor will be read only, otherwaise not; default = false
 * @param {*} styleActiveLine true =  gives the wrapper of the line that contains the cursor, otherwaise not; default = false
 * @returns  new instance of CodeMirror
 */

function editor(id, language, lineNumbers = true, readOnly = false, styleActiveLine = true) {
  return CodeMirror.fromTextArea(document.getElementById(id), {
    lineNumbers,
    mode: language,
    styleActiveLine,
    readOnly,
    theme: "material-ocean", //"yonce",
    setSize: ("100%", "95%"),
  });

}
/**
 * Open a text file
 * @param {*} editor editor where the content of the file will be displayed  
 */
const openFile = async (editor) => {

  const { value: file } = await Swal.fire({
    title: 'Select File',
    input: 'file',

  })
  if (!file) return

  let reader = new FileReader();

  reader.onload = (e) => {
    const file = e.target.result;
    editor.setValue(file);
  }
  reader.onerror = (e) => {
    console.log("Error to read file", e.target.error)
  }
  reader.readAsText(file)
}
/**
 * Save editor content 
 * @param {*} fileName      file name
 * @param {*} extension     file extension
 * @param {*} editor        editor with the content to save
 */
const saveFile = async (fileName, extension, editor) => {
  if (!fileName) {
    const { value: name } = await Swal.fire({
      title: 'Enter File name',
      input: 'text',
      inputLabel: 'File name',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
      }
    })
    fileName = name;
  }
  if (fileName) {
    download(`${fileName}.${extension}`, editor.getValue())
  }
}
/**
 * Dowload a file.
 * @param {*} name file name
 * @param {*} content file content
 */
const download = (name, content) => {
  let blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  let link = document.getElementById('download');
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", name)
  link.click()
}
/**
 * Clean an editor's content.
 * @param {*} editor editor to clean the content.
 */
const cleanEditor = (editor) => {
  editor.setValue("");
}

/**
 * ANALIZADOR QUETZAL
 */
const AnalyzeQtzl = () => {
  var Output = ''
  console.log('Analizador Ascendente')
  var texto = xmlEditor.getValue();
  console.log(texto)

  //creacion del arbol
  console.log(grammar)
  var arbol = grammar.parse(texto);


  // 1era pasada - guardando variables globales
  //arbol.forEach(element => element.ejecutar(null, null))

  // 2da pasada - ejecutando intrucciones
  arbol.forEach(element => 
    Output += element.ejecutar(null, null)
    )
  
  console.log('SALIDA: ')
  console.log(Output)

  console.log(consoleResult)
  console.log(xmlEditor)

 /*  //cargando datos a tabla de simbolos
  symbolTableXml.destroy();
  symbolTableXml = newDataTable('#symbolTableXml',
    [{ data: "Idientifier" }, { data: "Type" }, { data: "Value" }, { data: "Row" }, { data: "Column" }, { data: "Environment" }],
    TablaSimbolos);
  //cargando datos a tabla de errores
  errorTableXml.destroy();
  errorTableXml = newDataTable('#errorTableXml',
    [{ data: "Error Type" }, { data: "Row" }, { data: "Column" }, { data: "Description" }],
    raiz_arbol.errores); */


}

/**
 * TRADUCTOR QUETZAL
 */
const TranslateQtzl = () => {
  console.log('Codigo de 3 direcciones')

}

/**
 * Necessary Functions 
 */
function CrearTabla(objeto) {
  //validando si existe el nodo
  if (objeto != undefined) {
    //definiendo valores
    let id = objeto.identificador;
    let tipo = 'etiqueta'
    let valor = objeto.texto;
    let linea = objeto.linea;
    let columna = objeto.columna;
    //creando el simbolo (entorno)
    let entorno = new Simbolo(id, tipo, valor, linea, columna, [])

    //creando entornos hijos
    if (objeto.listaAtributos != undefined) {
      objeto.listaAtributos.forEach(atr => {
        //definiendo valores
        let id = atr.identificador;
        let tipo = 'atributo'
        let valor = atr.valor;
        let linea = atr.linea;
        let columna = atr.columna;
        //creando el simbolo (entorno)
        let entorno_new = new Simbolo(id, tipo, valor, linea, columna, [])
        //agregando el entorno nuevo
        entorno.entorno.push(entorno_new)
      });
    }
    //recursividad hijos
    objeto.listaObjetos.forEach(obj => {
      //llamado recursivo
      entorno.entorno.push(CrearTabla(obj));
    });
    //retornando valor
    return entorno;
  }
}

function ReporteTabla(objeto, entorno, tabla) {
  //validando si existe el nodo
  if (objeto != undefined) {
    //definiendo valores
    let simbolo = {
      'Idientifier': objeto.id,
      'Type': objeto.tipo,
      'Value': objeto.valor,
      'Row': objeto.linea,
      'Column': objeto.columna,
      'Environment': entorno
    }
    tabla.push(simbolo);
    //recursividad entornos
    objeto.entorno.forEach(obj => {
      //llamado recursivo
      tabla = ReporteTabla(obj, objeto.id, tabla);
    });
    return tabla;
  }
}

function CST_XML(objeto) {
  var text = ''
  text += CrearCST(objeto, 1, text + 'digraph G {\n')
  text += '}'
  count_temp = 0;
  return text;
}

function CrearCST(objeto, count, node) {
  //validando si existe el nodo
  if (objeto != undefined) {
    //creando contador temporal 
    count_temp = count + 1;
    //creando nodo
    node += count + '[label="' + objeto.identificador + '"];\n';
    //creando nodos si contiene atributos
    if (objeto.listaAtributos.length > 0) {
      objeto.listaAtributos.forEach(atr => {
        node += count_temp + '[label="' + atr.identificador + '"];\n';
        node += count + '--' + count_temp + ';\n';
        count_temp++;
      });
    }
    if (objeto.listaObjetos.length > 0) {
      objeto.listaObjetos.forEach(obj => {
        node += count + '--' + count_temp + ';\n';
        // let node_temp = CrearCST(obj, count_temp2, '');
        let node_temp = CrearCST(obj, count_temp, '');
        node += node_temp

        count_temp++;
      });
    }

    //retornando nodo
    count++;
    return node;
  }
}

function Encoding(cadena) {
  //encoding
  for (let enc of GlobalTree.config) {
    if (enc.identificador.toLowerCase() == 'encoding') {
      switch (enc.valor.toLowerCase()) {
        case 'utf-8':
          cadena = utf8(cadena);
          break;
        case 'ascii':
          cadena = ascii(cadena);
          break;
        default:
          console.log('No se encontro codificacion valida')
          break;
      }
    }
  }
  return cadena;
}

function utf8(s) {
  return unescape(encodeURIComponent(s));
}

function ascii(s) {
  var salida = ''
  for (let cha of s) {
    salida += cha.charCodeAt(0) + ' ';
  }
  return salida;
}

function iso(s) {
  return decodeURIComponent(escape(s));
}



/**
 *  Reinitialize data table
 * @param {*} id        id from table whit '#' -> exampble: #{id}
 * @param {*} columns   arrays of objects with columns name  -> [ { data: "columnName" }, { data: "columnName" }, ]
 * @param {*} data      array of objects with table data -> [ { "columnName": "data" }, { "columnName": "data" } ]
 * @returns             data table
 */
const newDataTable = (id, columns, data) => {
  let result = $(id).DataTable({
    responsive: true,
    lengthMenu: [[5, 10, 15, 25, 50, -1], [5, 10, 15, 25, 50, "All"]],
    "lengthChange": true,
    data,
    columns
  });
  $('select').formSelect();
  return result;
}



const btnOpenXml = document.getElementById('btn__open__xml'),
  btnSaveXml = document.getElementById('btn__save__xml'),
  btnCleanXml = document.getElementById('btn__clean__xml'),
  btnShowCst = document.getElementById('showAST'),
  btnDescXml = document.getElementById('btn__descAnalysis__xml'),
  btnAscXml = document.getElementById('btn__ascAnalysis__xml'),
  btnOpenXpath = document.getElementById('btn__open__xpath'),
  btnSaveXpath = document.getElementById('btn__save__xpath'),
  btnCleanXpath = document.getElementById('btn__clean__xpath'),
  btnShowAst = document.getElementById('showAST');
  btnRun = document.getElementById('btn_run'),
  btnC3d = document.getElementById('btn_c3d')

btnOpenXml.addEventListener('click', () => openFile(xmlEditor));
btnSaveXml.addEventListener('click', () => saveFile("database", "xml", xmlEditor));
btnCleanXml.addEventListener('click', () => cleanEditor(xmlEditor));
btnShowCst.addEventListener('click', () => localStorage.setItem("dot", dotStringCst));
// btnDescXml.addEventListener('click', () => analysDescXml());
// btnAscXml.addEventListener('click', () => analysAscXml());

// btnOpenXpath.addEventListener('click', () => openFile(xpathEditor));
// btnSaveXpath.addEventListener('click', () => saveFile("query", "txt", xpathEditor));
// btnCleanXpath.addEventListener('click', () => cleanEditor(xpathEditor));
btnShowAst.addEventListener('click', () => localStorage.setItem("dot", dotStringAst));
btnRun.addEventListener('click', () => AnalyzeQtzl());
btnC3d.addEventListener('click', () => TranslateQtzl());