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
		  
		if(respuesta.mensaje=="noconex"){
			 alert('No es posible conectar con la Base de Datos');
			}else{
				 
		if(respuesta.validacion == "ok"){
  
		   setCookie("id",respuesta.id);
		   setCookie("cedula",respuesta.cedula);
		   setCookie("nombres",respuesta.nombres);
		   setCookie("grupo",respuesta.grupo);
		   setCookie("clinica",respuesta.clinica);
		   setCookie("login",respuesta.login);

           var cabecerageneral="<a href='#' data-rel='back'>Atras</a><center><h3>O24 "+getCookie('clinica')+"</h3></center>Usuario: "+getCookie('nombres')+"<br/> Grupo: "+getCookie('grupo')+"<a href='#' class='exit'>Salir</a>";
            
            
             $('#cabeceramenu').html(cabecerageneral);
	         $('#cabecerap').html(cabecerageneral);
	         $('#cabecerahor').html(cabecerageneral);
			 $('#cabeceracasosquir').html(cabecerageneral);
			 $('#cmbcabecerapacv').html(cabecerageneral);
			 $('#cabecerapacv').html(cabecerageneral);
			 $('#cabecerahppc').html(cabecerageneral);
			 $('#cmbcabecerahppc').html(cabecerageneral);
			 $('#cabecerahppp').html(cabecerageneral);
			 $('#cmbcabecerahcancelados').html(cabecerageneral);
			 $('#cabecerahcancelados').html(cabecerageneral);
			 $('#cabecerafacturacion').html(cabecerageneral);
			 $('#cmbcabecerafacturacion').html(cabecerageneral);
			 $('#cabeceracfc').html(cabecerageneral);
             $('#cmbcabeceracfc').html(cabecerageneral);
	         
		  $.mobile.changePage("#menuprincipal");
		    
		     var cabeceracsalir="<center><h3>O24 "+getCookie('clinica')+"</h3> </center> Usuario: "+getCookie('nombres')+"<br/> Grupo: "+getCookie('grupo');

          	 
		}else{
 
                  alert(respuesta.mensaje);
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
	var ulogin = getCookie('login');
  
  var archivoValidacion = "php/pacientes.php";



	$.post(archivoValidacion, {id:uid,ced:uced,nom:unom,cli:ucli,login:ulogin})
	.done(function(respuestaServer) {
	    respuesta='';
	    respuesta=JSON.parse(respuestaServer);

	    //alert(respuesta[0].registros);
	     
	    if(respuesta[0].registros=="norecords"){
	    alert("No existen pacientes anotados en la lista de trabajo");
	    }else{


	    var longitud=respuesta.length;
	    var ul=$("#ulListviewPacientes");
	     ul.html(""); 
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
	    //Cargo el contenido de la Cabecera
         $("#cabecerapacv").html(cabecerageneral);
	    //Luego cambio de página
	    
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
	var ulogin = getCookie('login');
   
		//archivoValidacion = "php/pacientes.php?jsoncallback=?";
  var archivoValidacion = "php/horarios.php";

 
     
	$.post(archivoValidacion, {id:uid,ced:uced,nom:unom,cli:ucli,login:ulogin})
	.done(function(respuestaServer) {
	    respuesta='';
	    respuesta=JSON.parse(respuestaServer);
	    
	     
	    if(respuesta[0].registros=="norecords"){
	    alert("No existen pacientes anotados en la lista de trabajo");
	    }else{


	    var longitud=respuesta.length;
	    var ul=$("#ulListviewHorarios");
	     ul.html(""); 
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
         
        
        //cambio de pagina
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
	var ulogin = getCookie('login');
   
		//archivoValidacion = "php/pacientes.php?jsoncallback=?";
  var archivoValidacion = "php/casosQuir.php";


  
	$.post(archivoValidacion, {id:uid,ced:uced,nom:unom,cli:ucli,login:ulogin})
	.done(function(respuestaServer) {
	    respuesta='';
	    respuesta=JSON.parse(respuestaServer);
	   
	    if(respuesta[0].registros=="norecords"){
	    alert("No existen Casos Pendientes");
	    }else{


	    var longitud=respuesta.length;
	    var ul=$("#ulListviewCasosQuir");
	     ul.html(""); 
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
	var ulogin = getCookie('login');
   
		//archivoValidacion = "php/pacientes.php?jsoncallback=?";
  var archivoValidacion = "php/ultimosseismeses.php";

 
	$.post(archivoValidacion, {id:uid,ced:uced,nom:unom,cli:ucli,login:ulogin})
	.done(function(respuestaServer) {
	    respuesta='';
	    respuesta=JSON.parse(respuestaServer);
	 
	    var longitud=respuesta.length;
	    var ul=$("#cmbulListviewPacV");
	     ul.html(""); 
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
	var ulogin = getCookie('login');
   
		//archivoValidacion = "php/pacientes.php?jsoncallback=?";
  var archivoValidacion = "php/pacientesvistos.php";

    var valorObtenido=$(this).text();
    var arreglotemp=valorObtenido.split(' ');
    var m=arreglotemp[0];
    var a=arreglotemp[1];

    $.post(archivoValidacion, {id:uid,ced:uced,nom:unom,cli:ucli,mes:m,anhio:a,login:ulogin})
	.done(function(respuestaServer) {
	    respuesta='';
	    respuesta=JSON.parse(respuestaServer);
	    
	    if(respuesta[0].registros=="norecords"){
	    alert("No existen Pacientes Vistos");
	    }else{


	    var longitud=respuesta.length;
	    var ul=$("#ulListviewPacV");
	    var totalCobrar=0;

	     ul.html("");

		 for (var i=0;i<longitud;i++){
			  
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
	var ulogin = getCookie('login');
   
		//archivoValidacion = "php/pacientes.php?jsoncallback=?";
  var archivoValidacion = "php/ultimosseismeses.php";


    //alert(archivoValidacion);


	$.post(archivoValidacion, {id:uid,ced:uced,nom:unom,cli:ucli,login:ulogin})
	.done(function(respuestaServer) {
	    respuesta='';
	    respuesta=JSON.parse(respuestaServer);
	   
	    var longitud=respuesta.length;
	    var ul=$("#cmbulListviewHPPorCobrar");
	     ul.html("");
	    
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
	var ulogin = getCookie('login');
   
		//archivoValidacion = "php/pacientes.php?jsoncallback=?";
  var archivoValidacion = "php/hpporcobrar.php";

    var valorObtenido=$(this).text(); /*valor obtenido al hacer click en el mes*/
   
    var arreglotemp=valorObtenido.split(' ');
    var m=arreglotemp[0];
    var a=arreglotemp[1];

 
	$.post(archivoValidacion, {id:uid,ced:uced,nom:unom,cli:ucli,mes:m,anhio:a,login:ulogin})
	.done(function(respuestaServer) {
	    respuesta='';
	    respuesta=JSON.parse(respuestaServer);
	    
	   
	    if(respuesta[0].registros=="norecords"){
	    alert("No existen HP Por Cobrar");
	    }else{
              var longitud=respuesta.length;
	          var ul= $("#ulListviewHPPorCobrar");
	          var totalCobrar=0;

	     ul.html(""); 
		 
		  for(var i=0;i<longitud;i++){
			 
			  totalCobrar+= parseFloat(respuesta[i].montopro);
          }
		 

	  var cc=formato(totalCobrar,2,['.', ".", ',']);

		 
		var separador='<li data-role="divider">HP Por Cobrar del mes de '+m+' de '+a+'<br/><b>  (Total a Cobrar '+cc+' BsF)</b></li>';
		 ul.append(separador);

        var lista='';
		for(var i=0;i<longitud;i++){
			//hist","nomb","edad","sexo","fcirug","descri","diagno","obser"
		   lista+='<li data-theme="c">'+
		  '<br><b>Fecha:</b>'+respuesta[i].fecha+
		  '<br><b>Cliente:</b> '+respuesta[i].nomcli+
		  '<br><b>Paciente:</b> '+respuesta[i].nompac+
		  '<br><b>Descripci&oacute;n: </b>'+respuesta[i].descri+
		  '<br><b>Monto:</b>'+respuesta[i].montopro+' BsF</li>';
		    


	    }
        
        //ul.append(lista);
        ul.append(lista);
	    $.mobile.changePage('#listadoHPPorCobrar');
	    

		ul.listview("refresh");

	  }

	});

	 return false;

});


/****** Mostrar Honorarios Profesionales Cancelados Por Pagar 28-04-2016 by Ing. Robyir Loreto ******************************/

$('#btntoHPCancelPPagar').click(function(){
 
	var uid = getCookie('id');
	var uced = getCookie('cedula');
	var unom = getCookie('nombres');
	var ucli = getCookie('clinica');
	var ugru = getCookie('grupo');
	var ulogin = getCookie('login');
 
  var archivoValidacion = "php/hpcancelporpagar.php";

   
	$.post(archivoValidacion, {id:uid,ced:uced,nom:unom,cli:ucli,login:ulogin})
	.done(function(respuestaServer) {

	    respuesta = '';
	    respuesta = JSON.parse(respuestaServer);
	    
	    if(respuesta[0].registros == "norecords"){
	    alert("No existen HP Por Cancelados por Pagar");
	    }else{

        
	    var longitud=respuesta.length;
	    var ul=$("#ulListviewHPCancelPorPagar");
	    var totalCobrar=0;
	    var totalPagar=0;

	     ul.html(""); 

		 for (var i=0;i<longitud;i++){
			 
			  totalCobrar+= parseFloat(respuesta[i].monto);
			  totalPagar+= parseFloat(respuesta[i].saldo);
			 }
		 

	  var cc=formato(totalCobrar,2,['.', ".", ',']);
	  var pp=formato(totalPagar,2,['.', ".", ',']);

		//var separador='<li data-role="divider">Pacientes Vistos del mes de '+m+' de '+a+'<b>  (Total a Cobrar '+totalCobrar+' BsF)</b></li>';
		var separador='<li data-role="divider">HP Cancelados Por Pagar<br/><b>  (Total: '+cc+' BsF) (Restan: '+pp+' BsF )</b></li>';
		var lista=''; 
		 ul.append(separador);

 
		for(var i=0;i<longitud;i++){
			//hist","nomb","edad","sexo","fcirug","descri","diagno","obser"
		  lista+='<li data-theme="c">'+
		  '<br><b>Fecha:</b>'+respuesta[i].fechareg+
		  '<br><b>Paciente:</b> '+respuesta[i].paciente+
		  '<br><b>Servicio:</b> '+respuesta[i].servicio+
		  '<br><b>Monto:</b> '+respuesta[i].monto+' BsF'+
		  '<br><b>Saldo:</b>'+respuesta[i].saldo+' BsF</li>';
		    

	    }
         ul.append(lista);
	    $.mobile.changePage("#listadoHPCancelPorPagar");

		ul.listview("refresh");
	}

	});

	 return false;


});



/*Resumen de Honorarios Cancelados */
$('#btntoHCancelados').click(function() {

	// recolecta los valores que inserto el usuario
	var uid = getCookie('id');
	var uced = getCookie('cedula');
	var unom = getCookie('nombres');
	var ucli = getCookie('clinica');
	var ugru = getCookie('grupo');
	var ulogin = getCookie('login');
 
		//archivoValidacion = "php/pacientes.php?jsoncallback=?";
  var archivoValidacion = "php/ultimosseismesesHCancelados.php";


    //alert(archivoValidacion);
    //alert("UID: "+uid+" cedula: "+uced+" nombres: "+unom+" ucli: "+ucli+" grupo: "+ugru);

	$.post(archivoValidacion, {id:uid,ced:uced,nom:unom,cli:ucli,login:ulogin})
	.done(function(respuestaServer) {
	    respuesta='';
	    respuesta=JSON.parse(respuestaServer);
	    
	    var longitud=respuesta.length;
	    var ul=$("#cmbulListviewHCancelados");
	     ul.html("");
		 
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
	var ulogin = getCookie('login');
   
		//archivoValidacion = "php/pacientes.php?jsoncallback=?";
  var archivoValidacion = "php/resumenhcancelados.php";

    var valorObtenido=$(this).text();
   

    var arreglotemp=valorObtenido.split(' ');
    var m=arreglotemp[0];
    var a=arreglotemp[1];
 
	$.post(archivoValidacion, {id:uid,ced:uced,nom:unom,cli:ucli,mes:m,anhio:a,login:ulogin})
	.done(function(respuestaServer) {
	    respuesta='';
	    respuesta=JSON.parse(respuestaServer);
	      
	    if(respuesta[0].registros=="norecords"){
	    alert("No existe un Resumen de Honorarios Cancelados");
	    }else{


	    var longitud=respuesta.length;
	    var ul=$("#ulListviewHCancelados");
	    var totalCobrar=0;

	     ul.html("");
	    
		 for (var i=0;i<longitud;i++){
			 
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



/***************************************************************/
/*                    ADMINISTRATIVO                           */
/***************************************************************/
/** Lista para seleccionar  Mes de Facturación Septiembre 2016 by Ing. Robyir Loreto **/

$('#btntoFacturacion').click(function() {

	// recolecta los valores que inserto el usuario
	var uid = getCookie('id');
	var uced = getCookie('cedula');
	var unom = getCookie('nombres');
	var ucli = getCookie('clinica');
	var ugru = getCookie('grupo');
	var ulogin = getCookie('login');
  var cabecerafacturacion="";
		//archivoValidacion = "php/pacientes.php?jsoncallback=?";
  var archivoValidacion = "php/ultimosseismeses.php";
 
	$.post(archivoValidacion, {id:uid,ced:uced,nom:unom,cli:ucli,login:ulogin})
	.done(function(respuestaServer) {
	    respuesta='';
	    respuesta=JSON.parse(respuestaServer);
	 
	    var longitud=respuesta.length;
	    var ul=$("#cmbulListviewFacturacion");
	     ul.html(""); 
	 
		var separador='<li data-role="divider">Seleccione Mes a Consultar</li>';
		 ul.append(separador);

		  var lista='';

		  $.each(respuesta,function(i,valor){
			   lista+='<li data-theme="a"><a href="#">'+valor+'</a></li>';

			  });


		    ul.append(lista);

        
	    $.mobile.changePage("#cmblistadoFacturacion");

		ul.listview("refresh");


	});

	 return false;

});

/****** Mostrar CFC Septiembre 2016 by Ing.Robyir Loreto ******************************/
$('#cmbulListviewFacturacion').delegate('li','click',function() {
/*$('#btntoPacVistos').click(function() {*/

	// recolecta los valores que inserto el usuario
	var uid = getCookie('id');
	var uced = getCookie('cedula');
	var unom = getCookie('nombres');
	var ucli = getCookie('clinica');
	var ugru = getCookie('grupo');
	var ulogin = getCookie('login');
   
		//archivoValidacion = "php/pacientes.php?jsoncallback=?";
  var archivoValidacion = "php/facturacion.php";

    var valorObtenido=$(this).text();
     
    var arreglotemp=valorObtenido.split(' ');
    var m=arreglotemp[0];
    var a=arreglotemp[1];

    $.post(archivoValidacion, {id:uid,ced:uced,nom:unom,cli:ucli,mes:m,anhio:a,login:ulogin})
	.done(function(respuestaServer) {
	    respuesta='';
	    respuesta=JSON.parse(respuestaServer);
	  
	    if(respuesta[0].registros=="norecords"){
	    alert("Usuario No Autorizado!!!");
	    }else{


	    var longitud=respuesta.length;
         
	    var totalCobrar=0;

	     var tabla=$("#tablaVerFacturacion");

		 for (var i=0;i<longitud;i++){
			 
			  totalCobrar+= parseFloat(respuesta[i].monto2);

			 }


	  var cc=formato(totalCobrar,2,['.', ".", ',']);

		 
		var contenido='<div class="ui-block-a  ui-bar-a" style="border:1;">FACTURAS</div>'+
		  '<div class="ui-block-b  ui-bar-a" style="border:1;">TIPO</div>'+
		  '<div class="ui-block-c  ui-bar-a" style="border:1;">CANTIDAD</div>'+
		  '<div class="ui-block-d  ui-bar-a" style="border:1;">NETO</div>';
 

		for(var i=0;i<longitud;i++){
        
		  contenido+='<div class="ui-block-a"><div class="ui-bar-c">'+respuesta[i].documento+'</div></div>'+
		  '<div class="ui-block-b"><div class="ui-bar-c">'+respuesta[i].tipo+'</div></div>'+
		  '<div class="ui-block-c"><div class="ui-bar-c">'+respuesta[i].cantidad+'</div></div>'+
		  '<div class="ui-block-d"><div class="ui-bar-c">'+formato(respuesta[i].neto,2,['.', ".", ','])+' BsF</div></div>';
		  }
     
	    tabla.html(contenido);
        
	    $.mobile.changePage("#listadoFacturacion");

		
       //tabla.table("refresh");
	}

	});

	 return false;

});


	
 

/****************************************************************/

/** Lista para seleccionar  Mes de CFC Septiembre 2016 by Ing. Robyir Loreto **/

$('#btntoCFC').click(function() {

	// recolecta los valores que inserto el usuario
	var uid = getCookie('id');
	var uced = getCookie('cedula');
	var unom = getCookie('nombres');
	var ucli = getCookie('clinica');
	var ugru = getCookie('grupo');
	var ulogin = getCookie('login');
  
		//archivoValidacion = "php/pacientes.php?jsoncallback=?";
  var archivoValidacion = "php/ultimosseismeses.php";
 
	$.post(archivoValidacion, {id:uid,ced:uced,nom:unom,cli:ucli,login:ulogin})
	.done(function(respuestaServer) {
	    respuesta='';

	    respuesta=JSON.parse(respuestaServer);

	  
	    var longitud=respuesta.length;
	    var ul=$("#cmbulListviewCFC");
	     ul.html(""); 
	 
		var separador='<li data-role="divider">Seleccione Mes a Consultar</li>';
		 ul.append(separador);

		  var lista='';

		  $.each(respuesta,function(i,valor){
			   lista+='<li data-theme="a"><a href="#">'+valor+'</a></li>';

			  });


		    ul.append(lista);

        
	    $.mobile.changePage("#cmblistadoCFC");

		ul.listview("refresh");


	});

	 return false;

});

/****** Mostrar Facturacion Septiembre 2016 by Ing.Robyir Loreto ******************************/
$('#cmbulListviewCFC').delegate('li','click',function() {
/*$('#btntoPacVistos').click(function() {*/

	// recolecta los valores que inserto el usuario
	var uid = getCookie('id');
	var uced = getCookie('cedula');
	var unom = getCookie('nombres');
	var ucli = getCookie('clinica');
	var ugru = getCookie('grupo');
	var ulogin = getCookie('login');
   
		//archivoValidacion = "php/pacientes.php?jsoncallback=?";
  var archivoValidacion = "php/CFC.php";

    var valorObtenido=$(this).text();
    alert(valorObtenido);
    var arreglotemp=valorObtenido.split(' ');
    var m=arreglotemp[0];
    var a=arreglotemp[1];

    $.post(archivoValidacion, {id:uid,ced:uced,nom:unom,cli:ucli,mes:m,anhio:a,login:ulogin})
	.done(function(respuestaServer) {
	    respuesta='';
	    respuesta=JSON.parse(respuestaServer);
	     
	    if(respuesta[0].registros=="norecords"){
	    alert("Usuario No Autorizado!!!");
	    }else{


	    var longitud=respuesta.length;
         
	    var totalCobrar=0;

	     var tabla=$("#tablaVerCFC");
 


	  var cc=formato(totalCobrar,2,['.', ".", ',']);

		 
		var contenido='<div class="ui-block-a  ui-bar-a" style="border:1;">TIPO</div>';
		    contenido+='<div class="ui-block-b  ui-bar-a" style="border:1;">MONTO</div>';
 

		for(var i=0;i<longitud;i++){
        
		  contenido+='<div class="ui-block-a"><div class="ui-bar-c">'+respuesta[i].tipo+'</div></div>'+
		  '<div class="ui-block-b"><div class="ui-bar-c">'+formato(respuesta[i].monto,2,['.', ".", ','])+' BsF</div></div>';
		  }
         
	    tabla.html(contenido);
        
	    $.mobile.changePage("#listadoCFC");
	  
		
       //tabla.table("refresh");
	}
 
	});

	 return false;

});

 
	
 
/**********************FUNCIONES PARA LA GESTION DE COOKIES ***********/

 

function setCookie(cname, cvalue) {
     $.cookie(cname,cvalue,{expires: 7, path:'/'});
}

function getCookie(cname) {
  var cadena=cname; 
    return $.cookie(cadena);
}

 function borrarCookie(cname) {
         $.cookie(cname, null, { path: '/' });
        }

function cerrarSesion(){
  borrarCookie("id"); 
  borrarCookie("cedula");
  borrarCookie("nombres");
  borrarCookie("clinica");
  borrarCookie("grupo"); 
  borrarCookie("login"); 

  navigator.app.exitApp();
  //$.mobile.changePage("#main");

}
 

 $(document).on('click', '.exit', function () {
             cerrarSesion();
           });
 

 


});/*Fin*/
