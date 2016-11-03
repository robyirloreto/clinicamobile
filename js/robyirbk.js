
$(document).ready(function(){

function formato(value, decimals, separators) {
    decimals = decimals >= 0 ? parseInt(decimals, 0) : 2;
    separators = separators || ['.', "'", ','];
    var number = (parseFloat(value) || 0).toFixed(decimals);
    if (number.length <= (4 + decimals))
        return number.replace('.', separators[separators.length - 1]);
    var parts = number.split(/[-.]/);
    value = parts[parts.length > 1 ? parts.length - 2 : 0];
    var result = value.substr(value.length - 3, 3) + (parts.length > 1 ?
        separators[separators.length - 1] + parts[parts.length - 1] : '');
    var start = value.length - 6;
    var idx = 0;
    while (start > -3) {
        result = (start > 0 ? value.substr(start, 3) : value.substr(0, 3 + start))
            + separators[idx] + result;
        idx = (++idx) % 2;
        start -= 3;
    }
    return (parts.length == 3 ? '-' : '') + result;
}

/*Function para formatear moneda de 99999.99 a 9.999.999,99*/


function moneda(montoConPuntoEnDecimal){
 var arraytotal='';
 var pentera='';
 var pdecimal='';
 var valor=montoConPuntoEnDecimal;
 arraytotal=v.split('.');

	pentera=arraytotal[0];
	pdecimal=arraytotal[1];
	return formato(pentera)+','+pdecimal;
 }

function redondear(x, n) {

  if (n < 1 || n > 14) return false;
  var e = Math.pow(10, n);
  var k = (Math.round(x * e) / e).toString();
  if (k.indexOf(',') == -1) k += ',';
  k += e.toString().substring(1);
  return k.substring(0, k.indexOf(',') + n+1);
}

$('#frmlog').submit(function(){

	// recolecta los valores que inserto el usuario
	var datosUsuario = $("#txtuser").val();
	var datosPassword = $("#txtpass").val();
	var datosClinica=$("#cmbClinica").val();
  	//archivoValidacion = "php/validacion_de_datos.php?jsoncallback=?";
  	archivoValidacion = "php/validacion_de_datos.php";
	$.post(archivoValidacion, { usuario:datosUsuario ,password:datosPassword, clinica:datosClinica})
	.done(function(respuestaServer) {

		var respuesta=JSON.parse(respuestaServer);
		 //alert(respuestaServer.cedula + "\nGenerado en: " + respuestaServer.hora + "\n")
		//alert(respuesta.validacion);
		if(respuesta.mensaje=="noconex"){
			 alert('No es posible conectar con la Base de Datos');
			}else{
		if(respuesta.validacion == "ok"){
		    /*borramos posibles cookies de otra sesion*/
		     deleteCookie("id");
		     deleteCookie("cedula");
		     deleteCookie("nombres");
		     deleteCookie("grupo");
		     deleteCookie("clinica");

		 	/// si la validacion es correcta,establece las cookies y muestra la pantalla "home"
		 	/******** funciones para gestion de cookies *************/


		   /******************************************/
		   setCookie("id",respuesta.id,2);
		   setCookie("cedula",respuesta.cedula,2);
		   setCookie("nombres",respuesta.nombres,2);
		   setCookie("grupo",respuesta.grupo,2);
		   setCookie("clinica",respuesta.clinica,2);



		  $.mobile.changePage("#menuprincipal");
		  var cabeceram="<center><h3>O24 "+getCookie('clinica')+"</h3></center>Usuario: "+getCookie('nombres')+"<br/> Grupo: "+getCookie('grupo');

		 $('#cabeceramenu').html(cabeceram);
         $('#cabecerap').html(cabeceram);
         $('#cabecerahor').html(cabeceram);
		 $('#cabeceracasosquir').html(cabeceram);
		 $('#cmbcabecerapacv').html(cabeceram);
		 $('#cabecerapacv').html(cabeceram);
		 $('#cabecerahppc').html(cabeceram);
		 $('#cmbcabecerahppc').html(cabeceram);
		 $('#cabecerahppp').html(cabeceram);
		 $('#cmbcabecerahcancelados').html(cabeceram);
		 $('#cabecerahcancelados').html(cabeceram);

		}else{

		  /// ejecutar una conducta cuando la validacion falla
                  alert('Credenciales no v'+u00e1+'lidas!!! Inténtelo de nuevo');
		}
       }
	});

	return false;
});





/**************** Para mostrar los pacientes por ver *****************/
$('#btntolistadoPac').click(function() {

	// recolecta los valores que inserto el usuario
	var uid = getCookie('id');
	var uced = getCookie('cedula');
	var unom = getCookie('nombres');
	var ucli = getCookie('clinica');
	var ugru = getCookie('grupo');
  var cabeceram="";


		//archivoValidacion = "php/pacientes.php?jsoncallback=?";
  var archivoValidacion = "php/pacientes.php";



	$.post(archivoValidacion, {id:uid,ced:uced,nom:unom,cli:ucli})
	.done(function(respuestaServer) {
	    respuesta='';
	    respuesta=JSON.parse(respuestaServer);

	    //alert(respuesta[0].registros);
	    if(respuesta[0].registros=="norecords"){
	    alert("No existen pacientes anotados en la lista de trabajo");
	    }else{


	    var longitud=respuesta.length;
	    var ul=$("#ulListviewPacientes");
	     ul.html("");//para limpiar el ul al momento de hacer back y luego avanzar
		//alert("Longitud: "+longitud);

		var separador='<li data-role="divider">Pacientes por ver</li>';
		 ul.append(separador);

		for(var i=0;i<longitud;i++){
		  var lista='<li data-theme="a"><a href="#">Hora Evoluci&oacute;n:'+respuesta[i].horaevo+
		  '<br>Fecha Evoluci&oacute;n: '+respuesta[i].fechaevo+
		  '<br>Historia: '+respuesta[i].nhistoria+
		  '<br>Paciente: '+respuesta[i].paciente+
		  '<br>Edad: '+respuesta[i].edad+
		          '<br>Motivo: '+respuesta[i].servicio+' </a></li>';
		    ul.append(lista);
	    }
	    $.mobile.changePage("#listadoPac");

		ul.listview("refresh");
	}
	});

	 return false;

});


/********************** Mostrar Horarios ******************************/
$('#btntoHorarios').click(function() {

	// recolecta los valores que inserto el usuario
	var uid = getCookie('id');
	var uced = getCookie('cedula');
	var unom = getCookie('nombres');
	var ucli = getCookie('clinica');
	var ugru = getCookie('grupo');
  var cabecerahor="";
		//archivoValidacion = "php/pacientes.php?jsoncallback=?";
  var archivoValidacion = "php/horarios.php";


    //alert(archivoValidacion);
    //alert("UID: "+uid+" cedula: "+uced+" nombres: "+unom+" ucli: "+ucli+" grupo: "+ugru);

	$.post(archivoValidacion, {id:uid,ced:uced,nom:unom,cli:ucli})
	.done(function(respuestaServer) {
	    respuesta='';
	    respuesta=JSON.parse(respuestaServer);
	    //alert(respuesta[0].dia);
	    //alert(respuestaServer);
	    if(respuesta[0].registros=="norecords"){
	    alert("No existen pacientes anotados en la lista de trabajo");
	    }else{


	    var longitud=respuesta.length;
	    var ul=$("#ulListviewHorarios");
	     ul.html("");//para limpiar el ul al momento de hacer back y luego avanzar
		 //alert("Longitud: "+longitud);
		var separador='<li data-role="divider">Horario de Consultas</li>';
		 ul.append(separador);

		for(var i=0;i<longitud;i++){
		  var lista='<li data-theme="a"><a href="#">'+
		  '<br>Dia: '+respuesta[i].dia+
		  '<br>Desde: '+respuesta[i].desde+
		  '<br>Hasta: '+respuesta[i].hasta+
		  '<br>Consultorio: '+respuesta[i].consultorio+' </a></li>';
		    ul.append(lista);
	    }

	    $.mobile.changePage("#listadoHor");

		ul.listview("refresh");
	}

	});

	 return false;

});

//ulListviewCasosQuir

/****** Mostrar Casos Quirurgicos pendientes 15-12-2015 by Robyir Loreto ******************************/
$('#btntoCasosQuirPend').click(function() {

	// recolecta los valores que inserto el usuario
	var uid = getCookie('id');
	var uced = getCookie('cedula');
	var unom = getCookie('nombres');
	var ucli = getCookie('clinica');
	var ugru = getCookie('grupo');
  var cabecerahor="";
		//archivoValidacion = "php/pacientes.php?jsoncallback=?";
  var archivoValidacion = "php/casosQuir.php";


    //alert(archivoValidacion);
    //alert("UID: "+uid+" cedula: "+uced+" nombres: "+unom+" ucli: "+ucli+" grupo: "+ugru);

	$.post(archivoValidacion, {id:uid,ced:uced,nom:unom,cli:ucli})
	.done(function(respuestaServer) {
	    respuesta='';
	    respuesta=JSON.parse(respuestaServer);
	    //alert(respuesta[0].dia);
	    //alert(respuestaServer);
	    if(respuesta[0].registros=="norecords"){
	    alert("No existen Casos Pendientes");
	    }else{


	    var longitud=respuesta.length;
	    var ul=$("#ulListviewCasosQuir");
	     ul.html("");//para limpiar el ul al momento de hacer back y luego avanzar
		 //alert("Longitud: "+longitud);
		var separador='<li data-role="divider">Casos Quir\u00fargicos Pendientes</li>';
		 ul.append(separador);

		for(var i=0;i<longitud;i++){
			//hist","nomb","edad","sexo","fcirug","descri","diagno","obser"
		  var lista='<li data-theme="a"><a href="#">'+
		  '<br>Historia: '+respuesta[i].hist+
		  '<br>Paciente: '+respuesta[i].nomb+
		  '<br>Edad: '+respuesta[i].edad+
		  '<br>Sexo: '+respuesta[i].sexo+
		  '<br>F.Cirug\u00eda: '+respuesta[i].fcirug+
		  '<br>H.Cirug\u00eda: '+respuesta[i].hcirug+
		  '<br>Descripci\u00f3n: '+respuesta[i].descri+
		  '<br>Diagn\u00f3stico: '+respuesta[i].diagno+
		  '<br>Observaci\u00f3n: '+respuesta[i].obser+' </a></li>';
		    ul.append(lista);
	    }

	    $.mobile.changePage("#listadoCasosQuir");

		ul.listview("refresh");
	}

	});

	 return false;

});

/** Lista para seleccionar  Mes a Mostrar de Pacientes Vistos 29-12-2015 by Robyir Loreto **/

$('#btntoPacVistos').click(function() {

	// recolecta los valores que inserto el usuario
	var uid = getCookie('id');
	var uced = getCookie('cedula');
	var unom = getCookie('nombres');
	var ucli = getCookie('clinica');
	var ugru = getCookie('grupo');
  var cabecerahor="";
		//archivoValidacion = "php/pacientes.php?jsoncallback=?";
  var archivoValidacion = "php/ultimosseismeses.php";


    //alert(archivoValidacion);
    //alert("UID: "+uid+" cedula: "+uced+" nombres: "+unom+" ucli: "+ucli+" grupo: "+ugru);

	$.post(archivoValidacion, {id:uid,ced:uced,nom:unom,cli:ucli})
	.done(function(respuestaServer) {
	    respuesta='';
	    respuesta=JSON.parse(respuestaServer);
	    var longitud=respuesta.length;
	    var ul=$("#cmbulListviewPacV");
	     ul.html("");//para limpiar el ul al momento de hacer back y luego avanzar
		 //alert("Longitud: "+longitud);
		var separador='<li data-role="divider">Seleccione Mes a Consultar</li>';
		 ul.append(separador);

		  var lista='';

		  $.each(respuesta,function(i,valor){
			   lista+='<li data-theme="a"><a href="#">'+valor+'</a></li>';

			  });


		    ul.append(lista);


	    $.mobile.changePage("#cmblistadoPacV");

		ul.listview("refresh");


	});

	 return false;

});

/****** Mostrar Pacientes Vistos 18-12-2015 by TSU.Robyir Loreto ******************************/
$('#cmbulListviewPacV').delegate('li','click',function() {
/*$('#btntoPacVistos').click(function() {*/

	// recolecta los valores que inserto el usuario
	var uid = getCookie('id');
	var uced = getCookie('cedula');
	var unom = getCookie('nombres');
	var ucli = getCookie('clinica');
	var ugru = getCookie('grupo');
  var cabecerahor="";
		//archivoValidacion = "php/pacientes.php?jsoncallback=?";
  var archivoValidacion = "php/pacientesvistos.php";

    var valorObtenido=$(this).text();
    var arreglotemp=valorObtenido.split(' ');
    var m=arreglotemp[0];
    var a=arreglotemp[1];

    $.post(archivoValidacion, {id:uid,ced:uced,nom:unom,cli:ucli,mes:m,anhio:a})
	.done(function(respuestaServer) {
	    respuesta='';
	    respuesta=JSON.parse(respuestaServer);
	    //alert(respuesta[0].dia);
	    //alert(respuestaServer);
	    if(respuesta[0].registros=="norecords"){
	    alert("No existen Pacientes Vistos");
	    }else{


	    var longitud=respuesta.length;
	    var ul=$("#ulListviewPacV");
	    var totalCobrar=0;

	     ul.html("");

		 for (var i=0;i<longitud;i++){
			 //alert(respuesta[i].monto2);
			  totalCobrar+= parseFloat(respuesta[i].monto2);

			 }


	  var cc=formato(totalCobrar,2,['.', ".", ',']);

		var separador='<li data-role="divider">Pacientes Vistos del mes de '+m+' de '+a+'<br/><b>  (Total a Cobrar '+cc+' BsF)</b></li>';
		 ul.append(separador);


		for(var i=0;i<longitud;i++){

		  var lista='<li data-theme="c">'+
		  '<br><b>Fecha:</b>'+respuesta[i].fecha+
		  '<br><b>Paciente:</b> '+respuesta[i].pac+
		  '<br><b>Servicio: </b>'+respuesta[i].serv+
		  '<br><b>Monto:</b>'+respuesta[i].monto+' BsF</li>';
		    ul.append(lista);

	    }

	    $.mobile.changePage("#listadoPacV");

		ul.listview("refresh");
	}

	});

	 return false;

});


/*Honorarios Profesionales Por Cobrar*/
$('#btntoHPPCobrar').click(function() {

	// recolecta los valores que inserto el usuario
	var uid = getCookie('id');
	var uced = getCookie('cedula');
	var unom = getCookie('nombres');
	var ucli = getCookie('clinica');
	var ugru = getCookie('grupo');
  var cabecerahor="";
		//archivoValidacion = "php/pacientes.php?jsoncallback=?";
  var archivoValidacion = "php/ultimosseismeses.php";


    //alert(archivoValidacion);


	$.post(archivoValidacion, {id:uid,ced:uced,nom:unom,cli:ucli})
	.done(function(respuestaServer) {
	    respuesta='';
	    respuesta=JSON.parse(respuestaServer);
	    //alert(respuesta);
	    //alert(respuestaServer);
	    var longitud=respuesta.length;
	    var ul=$("#cmbulListviewHPPorCobrar");
	     ul.html("");
	     //para limpiar el ul al momento de hacer back y luego avanzar
		 //alert("Longitud: "+longitud);
		var separador='<li data-role="divider">Seleccione Mes a Consultar</li>';
		 ul.append(separador);

		  var lista='';

		  $.each(respuesta,function(i,valor){
			   lista+='<li data-theme="a"><a href="#">'+valor+'</a></li>';

			  });


		    ul.append(lista);


	    $.mobile.changePage("#cmblistadoHPPorCobrar");

		ul.listview("refresh");


	});

	 return false;

});

/****** Mostrar Honorarios Profesionales Por Cobrar 01-03-2016 by Ing. Robyir Loreto ******************************/
$('#cmbulListviewHPPorCobrar').delegate('li','click',function() {
/*$('#btntoPacVistos').click(function() {*/

	// recolecta los valores que inserto el usuario
	var uid = getCookie('id');
	var uced = getCookie('cedula');
	var unom = getCookie('nombres');
	var ucli = getCookie('clinica');
	var ugru = getCookie('grupo');
  var cabecerahor="";
		//archivoValidacion = "php/pacientes.php?jsoncallback=?";
  var archivoValidacion = "php/hpporcobrar.php";

    var valorObtenido=$(this).text(); /*valor obtenido al hacer click en el mes*/
    //alert(archivoValidacion);
    //alert("UID: "+uid+" cedula: "+uced+" nombres: "+unom+" ucli: "+ucli+" grupo: "+ugru);
    var arreglotemp=valorObtenido.split(' ');
    var m=arreglotemp[0];
    var a=arreglotemp[1];

    //alert(m);
	$.post(archivoValidacion, {id:uid,ced:uced,nom:unom,cli:ucli,mes:m,anhio:a})
	.done(function(respuestaServer) {
	    respuesta='';
	    respuesta=JSON.parse(respuestaServer);
	    //alert(respuesta[0].dia);
	    //alert(respuestaServer);
	    if(respuesta[0].registros=="norecords"){
	    alert("No existen HP Por Cobrar");
	    }else{


	    var longitud=respuesta.length;
	    var ul=$("#ulListviewHPPorCobrar");
	    var totalCobrar=0;

	     ul.html("");//para limpiar el ul al momento de hacer back y luego avanzar
		 //alert("Longitud: "+longitud);

		 /*Calculando monto*/
		 //longitud=3;
		 for (var i=0;i<longitud;i++){
			 //alert(respuesta[i].monto2);
			  totalCobrar+= parseFloat(respuesta[i].montopro);

			 }
			 //totalCobrar=totalCobrar.toFixed(2);
			//totalCobrar=String(totalCobrar.toFixed(2));

		    //alert(totalCobrar);

	  var cc=formato(totalCobrar,2,['.', ".", ',']);

		//var separador='<li data-role="divider">Pacientes Vistos del mes de '+m+' de '+a+'<b>  (Total a Cobrar '+totalCobrar+' BsF)</b></li>';
		var separador='<li data-role="divider">HP Por Cobrar del mes de '+m+' de '+a+'<br/><b>  (Total a Cobrar '+cc+' BsF)</b></li>';
		 ul.append(separador);


		for(var i=0;i<longitud;i++){
			//hist","nomb","edad","sexo","fcirug","descri","diagno","obser"
		  var lista='<li data-theme="c">'+
		  '<br><b>Fecha:</b>'+respuesta[i].fecha+
		  '<br><b>Cliente:</b> '+respuesta[i].nomcli+
		  '<br><b>Paciente:</b> '+respuesta[i].nompac+
		  '<br><b>Descripci&oacute;n: </b>'+respuesta[i].descri+
		  '<br><b>Monto:</b>'+respuesta[i].montopro+' BsF</li>';
		    ul.append(lista);

	    }

	    $.mobile.changePage("#listadoHPPorCobrar");

		ul.listview("refresh");
	}

	});

	 return false;

});

/**********************************************************************/

/****** Mostrar Honorarios Profesionales Cancelados Por Pagar 28-04-2016 by Ing. Robyir Loreto ******************************/
$('#btntoHPCancelPPagar').click(function() {
// recolecta los valores que inserto el usuario
	var uid = getCookie('id');
	var uced = getCookie('cedula');
	var unom = getCookie('nombres');
	var ucli = getCookie('clinica');
	var ugru = getCookie('grupo');
  var cabecerahor="";
		//archivoValidacion = "php/pacientes.php?jsoncallback=?";
  var archivoValidacion = "php/hpcancelporpagar.php";

    var valorObtenido=$(this).text(); /*valor obtenido al hacer click en el mes*/
    //alert(archivoValidacion);
    //alert("UID: "+uid+" cedula: "+uced+" nombres: "+unom+" ucli: "+ucli+" grupo: "+ugru);
    var arreglotemp=valorObtenido.split(' ');


    //alert(m);
	$.post(archivoValidacion, {id:uid})
	.done(function(respuestaServer) {

	    respuesta='';
	    respuesta=JSON.parse(respuestaServer);
	    //alert(respuesta[0].dia);
	    //alert(respuestaServer);
	    if(respuesta[0].registros=="norecords"){
	    alert("No existen HP Por Cancelados por Pagar");
	    }else{


	    var longitud=respuesta.length;
	    var ul=$("#ulListviewHPCancelPorPagar");
	    var totalCobrar=0;
	    var totalPagar=0;

	     ul.html("");//para limpiar el ul al momento de hacer back y luego avanzar
		 //alert("Longitud: "+longitud);

		 /*Calculando monto*/
		 //longitud=3;
		 for (var i=0;i<longitud;i++){
			 //alert(respuesta[i].monto2);
			  totalCobrar+= parseFloat(respuesta[i].monto);
			  totalPagar+= parseFloat(respuesta[i].saldo);
			 }
			 //totalCobrar=totalCobrar.toFixed(2);
			//totalCobrar=String(totalCobrar.toFixed(2));

		    //alert(totalCobrar);

	  var cc=formato(totalCobrar,2,['.', ".", ',']);
	  var pp=formato(totalPagar,2,['.', ".", ',']);

		//var separador='<li data-role="divider">Pacientes Vistos del mes de '+m+' de '+a+'<b>  (Total a Cobrar '+totalCobrar+' BsF)</b></li>';
		var separador='<li data-role="divider">HP Cancelados Por Pagar<br/><b>  (Total: '+cc+' BsF) (Restan: '+pp+' BsF )</b></li>';
		 ul.append(separador);


		for(var i=0;i<longitud;i++){
			//hist","nomb","edad","sexo","fcirug","descri","diagno","obser"
		  var lista='<li data-theme="c">'+
		  '<br><b>Fecha:</b>'+respuesta[i].fechareg+
		  '<br><b>Paciente:</b> '+respuesta[i].paciente+
		  '<br><b>Servicio:</b> '+respuesta[i].servicio+
		  '<br><b>Monto:</b> '+respuesta[i].monto+' BsF'+
		  '<br><b>Saldo:</b>'+respuesta[i].saldo+' BsF</li>';
		    ul.append(lista);

	    }

	    $.mobile.changePage("#listadoHPCancelPorPagar");

		ul.listview("refresh");
	}

	});

	 return false;


});


/**************jjjjjjjjjjjjjjjjjjjjjjjjj***********/
/*Resumen de Honorarios Cancelados */
$('#btntoHCancelados').click(function() {

	// recolecta los valores que inserto el usuario
	var uid = getCookie('id');
	var uced = getCookie('cedula');
	var unom = getCookie('nombres');
	var ucli = getCookie('clinica');
	var ugru = getCookie('grupo');
    var cmbcabecerahor="";
		//archivoValidacion = "php/pacientes.php?jsoncallback=?";
  var archivoValidacion = "php/ultimosseismesesHCancelados.php";


    //alert(archivoValidacion);
    //alert("UID: "+uid+" cedula: "+uced+" nombres: "+unom+" ucli: "+ucli+" grupo: "+ugru);

	$.post(archivoValidacion, {id:uid,ced:uced,nom:unom,cli:ucli})
	.done(function(respuestaServer) {
	    respuesta='';
	    respuesta=JSON.parse(respuestaServer);
	    //alert(respuesta);
	    //alert(respuestaServer);
	    var longitud=respuesta.length;
	    var ul=$("#cmbulListviewHCancelados");
	     ul.html("");
		 //alert("Longitud: "+longitud);
		var separador='<li data-role="divider">Seleccione Mes a Consultar</li>';
		 ul.append(separador);

		  var lista='';

		  $.each(respuesta,function(i,valor){
			   lista+='<li data-theme="a"><a href="#">'+valor+'</a></li>';

			  });


		    ul.append(lista);


	    $.mobile.changePage("#cmblistadoHCancelados");

		ul.listview("refresh");


	});

	 return false;

});

/****** Mostrar Resumen Honorarios Cancelados 13-07-2016 by Ing. Robyir Loreto ******************************/
$('#cmbulListviewHCancelados').delegate('li','click',function() {
/*$('#btntoPacVistos').click(function() {*/

	// recolecta los valores que inserto el usuario
	var uid = getCookie('id');
	var uced = getCookie('cedula');
	var unom = getCookie('nombres');
	var ucli = getCookie('clinica');
	var ugru = getCookie('grupo');
  var cabecerahor="";
		//archivoValidacion = "php/pacientes.php?jsoncallback=?";
  var archivoValidacion = "php/resumenhcancelados.php";

    var valorObtenido=$(this).text();
    /*valor obtenido al hacer click en el mes*/
    //alert(archivoValidacion);

    var arreglotemp=valorObtenido.split(' ');
    var m=arreglotemp[0];
    var a=arreglotemp[1];

    //alert(m);
	$.post(archivoValidacion, {id:uid,ced:uced,nom:unom,cli:ucli,mes:m,anhio:a})
	.done(function(respuestaServer) {
	    respuesta='';
	    respuesta=JSON.parse(respuestaServer);
	    //alert(respuesta[0].dia);
	    //alert(respuestaServer);
	    if(respuesta[0].registros=="norecords"){
	    alert("No existe un Resumen de Honorarios Cancelados");
	    }else{


	    var longitud=respuesta.length;
	    var ul=$("#ulListviewHCancelados");
	    var totalCobrar=0;

	     ul.html("");
	     //para limpiar el ul al momento de hacer back y luego avanzar
		 //alert("Longitud: "+longitud);

		 /*Calculando monto*/
		 //longitud=3;
		 for (var i=0;i<longitud;i++){
			 //alert(respuesta[i].monto2);
			  totalCobrar+= parseFloat(respuesta[i].monto);

			 }


	  var cc=formato(totalCobrar,2,['.', ".", ',']);


		var separador='<li data-role="divider">Honorarios Cancelados del mes de '+m+' de '+a+'<br/><b>  (Total a Cobrar '+cc+' BsF)</b></li>';
		 ul.append(separador);


		for(var i=0;i<longitud;i++){
			//hist","nomb","edad","sexo","fcirug","descri","diagno","obser"
		  var lista='<li data-theme="c">'+
		  '<br><b>Fecha:</b>'+respuesta[i].fecha+
		  '<br><b>Paciente:</b> '+respuesta[i].ncompleto+
		  '<br><b>Descripci&oacute;n: </b>'+respuesta[i].descri+
		  '<br><b>Monto:</b>'+respuesta[i].monto+' BsF</li>';
		    ul.append(lista);

	    }

	    $.mobile.changePage("#listadoHCancelados");

		ul.listview("refresh");
	}

	});

	 return false;

});

/**********************FUNCIONES PARA LA GESTION DE COOKIES ***********/

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function deleteCookie(cname){
	 document.cookie= cname+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
















});/*Fin*/
