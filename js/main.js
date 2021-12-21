
let errorTableXml, symbolTableXml, grammarTable;
let errorTableXpath, tokenTableXpath;
let QuetzalEditor, c3dResult, consoleResult;

let dotStringAst = { dot: '' }

//metodos codigo tres direcciones
var cont_t = 0, cont_l = 0, heap = 0, stack = 0, id_n = 0, cadena = '';

function new_temp(){
        cont_t += 1
        return 't'+String(cont_t)
}
function new_label(){
        cont_l += 1
        return 'L'+String(cont_l)
}

$(document).ready(function () {

  errorTableXml = $('#errorTableXml').DataTable();
  symbolTableXml = $('#symbolTableXml').DataTable();
  grammarTable = $('#grammarTable').DataTable();
  errorTableXpath = $('#errorTableXpath').DataTable();
  tokenTableXpath = $('#tokenTableXpath').DataTable();

  $('.tabs').tabs();
  $("select").formSelect();
  $('.tooltipped').tooltip();

  QuetzalEditor = editor('xml__editor');
  consoleResult = consola('console__result');
  c3dResult = consola('c3d__result');
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

function editor(id) {
  return CodeMirror.fromTextArea(document.getElementById(id), {
    lineNumbers: true,
    mode: "text/x-java",
    styleActiveLine: true,
    readOnly: false,
    theme: "material-ocean", //"yonce",
    setSize: ("100%", "100%"),
    autofocus: true
  });
}

function consola(id) {
  return CodeMirror.fromTextArea(document.getElementById(id), {
    lineNumbers: true,
    mode: "text/x-java",
    styleActiveLine: true,
    readOnly: true,
    theme: "material-ocean", //"yonce",
    setSize: ("100%", "100%"),
    autofocus: false
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

  var texto = QuetzalEditor.getValue();

  //creacion del arbol
  var Ast = grammar.parse(texto);

  //creacion entorno global
  var entorno = new Entorno(null, 'GLOBAL')

  try {
    //ejecutando intrucciones
    Ast.instrucciones.forEach(element => {
    element.ejecutar(entorno, Ast)
    })
    //ejecutando main
    Ast.main.ejecutar(entorno, Ast)
  } catch (error) {
    console.log('error')
  }

  //generando C3D
  Ast.setHeaders()
  Ast.OrdenarC3D()

  //imprimiendo consola e imprimiendo c3d
  consoleResult.setValue(Ast.getPrints())
  c3dResult.setValue(Ast.getC3D())

  console.log(Ast)

  //dibujando grafo (recorriendo arbol)
  cadena = 'digraph G {\n'
  DrawAst(Ast)
  cadena += '}'
  console.log(Ast.grammarReport)
  dotStringAst.dot = cadena

 //cargando datos a tabla de simbolos
  symbolTableXml.destroy();
  symbolTableXml = newDataTable('#symbolTableXml',
    [{ data: "id" }, { data: "type" }, { data: "env" }, { data: "val" }, { data: "row" }, { data: "col" }],
    Ast.getTable());

  //cargando datos a tabla de errores
  errorTableXml.destroy();
  errorTableXml = newDataTable('#errorTableXml',
    [{ data: "err" }, { data: "type" }, { data: "amb" }, { data: "line" }, { data: "col" }],
    Ast.getErrors());

  //cargando datos de reporte gramatical
  grammarTable.destroy();
  grammarTable = newDataTable('#grammarTable',[{data: 'grammar'}],
    Ast.getGrammar());
  
  
}
//GRAFICAR AST 
function DrawAst(nodo){
  //console.log(nodo)
  if(nodo.ast_id === 0){
    nodo.ast_id = id_n
    id_n++
  }
  cadena += nodo.ast_id+'[label="'+nodo.ast_name+'"];\n'
  nodo.hijos.forEach( element => {
    cadena += nodo.ast_id+'->'+id_n+';\n'
    DrawAst(element, cadena)
  })
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

btnOpenXml.addEventListener('click', () => openFile(QuetzalEditor));
btnSaveXml.addEventListener('click', () => saveFile("database", "xml", QuetzalEditor));
btnCleanXml.addEventListener('click', () => cleanEditor(QuetzalEditor));
btnShowCst.addEventListener('click', () => localStorage.setItem("dot", JSON.stringify(dotStringAst)));

btnRun.addEventListener('click', () => AnalyzeQtzl());
