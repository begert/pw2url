
function getParam(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function showPassword() {
  var data = {
    "iv":getParam('iv'),
    "v":1,
    "iter":1000,
    "ks":128,
    "ts":64,
    "mode":"ccm",
    "adata":"",
    "cipher":"aes",
    "salt":getParam('salt'),
    "ct":getParam('ct')
  }
  var masterPw = prompt("Masterpassword");
  var pass = sjcl.decrypt(masterPw, JSON.stringify(data));
  document.getElementById('output').innerHTML = pass;
}

function showUrl() {
  var data = prompt("Password to encypt");
  var masterPw = prompt("Masterpassword");
  var enc = sjcl.encrypt(masterPw, data);
  var obj = JSON.parse(enc);
  var iv = encodeURIComponent(obj.iv);
  var salt = encodeURIComponent(obj.salt);
  var ct = encodeURIComponent(obj.ct);
  var url = location;
  document.getElementById('output').innerHTML = url+"?iv="+iv+"&salt="+salt+"&ct="+ct;
}

function onload() {
  try {
    if(getParam('iv') != "") {
      showPassword();
    } else {
      showUrl();
    }
  } catch(e) {
    alert(e);
  }
}

  
