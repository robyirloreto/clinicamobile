


/****************************************************************************************/
//--------------------------------------- MASKING

/****************************************************************************************/
function redondeo(valor, decimales)
{
  var v=valor*Math.pow(10,decimales);
  v=Math.round(v);
  v=v/Math.pow(10,decimales);
  return v;
}


function _MaskAPI(){
        this.version = "0.4a";
        this.instances = 0;
        this.objects = {};
}
MaskAPI = new _MaskAPI();

function Mask(m, t){
        this.mask = m.toLowerCase();
        this.type = (typeof t == "string") ? t : "string";
        this.error = [];
        this.errorCodes = [];
        this.value = "";
        this.strippedValue = "";
        this.allowPartial = false;
        this.id = MaskAPI.instances++;
        this.ref = "MaskAPI.objects['" + this.id + "']";
        MaskAPI.objects[this.id] = this;
}

// define the attach(oElement) function
Mask.prototype.attach = function (o){
        $addEvent(o, "onkeydown", "return " + this.ref + ".isAllowKeyPress(event, this);", true);
        $addEvent(o, "onkeyup", "return " + this.ref + ".getKeyPress(event, this);", true);
        $addEvent(o, "onblur", "this.value = " + this.ref + ".format(this.value);", true);
}

Mask.prototype.isAllowKeyPress = function (e, o){

    if( this.type != "string" ) return true;
    var xe = new qEvent(e);

    if (o.readOnly && (xe.keyCode != 13) && (xe.keyCode != 27) && (xe.keyCode != 9))
    {
      if (window.event)
      {
        var evt = window.event || e;
        cancelaTecla(evt);
      }
    }

        if( ((xe.keyCode > 47) && (o.value.length >= this.mask.length)) && !xe.ctrlKey ) return false;
        return true;
}

Mask.prototype.getKeyPress = function (e, o, _u){
        this.allowPartial = true;
        var xe = new qEvent(e);

//        var k = String.fromCharCode(xe.keyCode);

        if( (xe.keyCode > 47) || (_u == true) || (xe.keyCode == 8 || xe.keyCode == 46) ){
                var v = o.value, d;
                if( xe.keyCode == 8 || xe.keyCode == 46 ) d = true;
                else d = false

                if( this.type == "number" ) this.value = this.setNumber(v, d);
                else if( this.type == "date" ) this.value = this.setDateKeyPress(v, d);
                else this.value = this.setGeneric(v, d);

                o.value = this.value;
        }
        /* */

        this.allowPartial = false;
        return true;
}

Mask.prototype.format = function (s){
        if( this.type == "number" ) this.value = this.setNumber(s);
        else if( this.type == "date" ) this.value = this.setDate(s);
        else this.value = this.setGeneric(s);
        return this.value;
}

Mask.prototype.throwError = function (c, e, v){
        this.error[this.error.length] = e;
        this.errorCodes[this.errorCodes.length] = c;
        if( typeof v == "string" ) return v;
        return true;
}


Mask.prototype.setNumber = function(_v, _d){
        var v = String(_v).replace(/[^\d.-]*/gi, ""), m = this.mask;
        // make sure there's only one decimal point
        v = v.replace(/\./, "d").replace(/\./g, "").replace(/d/, ".");

        // check to see if an invalid mask operation has been entered
        if( !/^[\$]?((\$?[\+-]?([0#]{1,3},)?[0#]*(\.[0#]*)?)|([\+-]?\([\+-]?([0#]{1,3},)?[0#]*(\.[0#]*)?\)))$/.test(m) )
                return this.throwError(1, "An invalid mask was specified for the \nMask constructor.", _v);

        if( (_d == true) && (v.length == this.strippedValue.length) ) v = v.substring(0, v.length-1);

        if( this.allowPartial && (v.replace(/[^0-9]/, "").length == 0) ) return v;
        this.strippedValue = v;

        if( v.length == 0 ) v = NaN;
        var vn = Number(v);
        if( isNaN(vn) ) return this.throwError(2, "The value entered was not a number.", _v);

        // if no mask, stop processing
        if( m.length == 0 ) return v;

        // get the value before the decimal point
        var vi = String(Math.abs((v.indexOf(".") > -1 ) ? v.split(".")[0] : v));
        // get the value after the decimal point
        var vd = (v.indexOf(".") > -1) ? v.split(".")[1] : "";
        var _vd = vd;

        var isNegative = (vn != 0 && Math.abs(vn)*-1 == vn);

        // check for masking operations
        var show = {
                "$" : /^[\$]/.test(m),
                "(": (isNegative && (m.indexOf("(") > -1)),
                "+" : ( (m.indexOf("+") != -1) && !isNegative )
        }
        show["-"] = (isNegative && (!show["("] || (m.indexOf("-") != -1)));


        // replace all non-place holders from the mask
        m = m.replace(/[^#0.,]*/gi, "");

        /*
                make sure there are the correct number of decimal places
        */
        // get number of digits after decimal point in mask
        var dm = (m.indexOf(".") > -1 ) ? m.split(".")[1] : "";
        if( dm.length == 0 ){
                vi = String(Math.round(Number(vi)));
                vd = "";
        } else {
                // find the last zero, which indicates the minimum number
                // of decimal places to show
                var md = dm.lastIndexOf("0")+1;
                // if the number of decimal places is greater than the mask, then round off
                if( vd.length > dm.length ) vd = String(Math.round(Number(vd.substring(0, dm.length + 1))/10));
                // otherwise, pad the string w/the required zeros
                else while( vd.length < md ) vd += "0";
        }

        /*
                pad the int with any necessary zeros
        */
        // get number of digits before decimal point in mask
        var im = (m.indexOf(".") > -1 ) ? m.split(".")[0] : m;
        im = im.replace(/[^0#]+/gi, "");
        // find the first zero, which indicates the minimum length
        // that the value must be padded w/zeros
        var mv = im.indexOf("0")+1;
        // if there is a zero found, make sure it's padded
        if( mv > 0 ){
                mv = im.length - mv + 1;
                while( vi.length < mv ) vi = "0" + vi;
        }


        /*
                check to see if we need commas in the thousands place holder
        */
        if( /[#0]+,[#0]{3}/.test(m) ){
                // add the commas as the place holder
                var x = [], i=0, n=Number(vi);
                while( n > 999 ){
                        x[i] = "00" + String(n%1000);
                        x[i] = x[i].substring(x[i].length - 3);
                        n = Math.floor(n/1000);
                        i++;
                }
                x[i] = String(n%1000);
                vi = x.reverse().join(",");
        }


        /*
                combine the new value together
        */
        if( (vd.length > 0 && !this.allowPartial) || ((dm.length > 0) && this.allowPartial && (v.indexOf(".") > -1) && (_vd.length >= vd.length)) ){
                v = vi + "." + vd;
        } else if( (dm.length > 0) && this.allowPartial && (v.indexOf(".") > -1) && (_vd.length < vd.length) ){
                v = vi + "." + _vd;
        } else {
                v = vi;
        }

        if( show["$"] ) v = this.mask.replace(/(^[\$])(.+)/gi, "$") + v;
        if( show["+"] ) v = "+" + v;
        if( show["-"] ) v = "-" + v;
        if( show["("] ) v = "(" + v + ")";
        return v;
}



