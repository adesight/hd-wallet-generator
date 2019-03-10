"use strict";

var bip39 = require("bip39");
var bitcoin = require("bitcoinjs-lib");

var p = document.createElement("div");
p.textContent = "Bitcoin HD Wallet generate onlines";
document.body.appendChild(p);

var mnemonic = bip39.generateMnemonic();
if (bip39.validateMnemonic(mnemonic)) {
  var p = document.createElement("div");
  p.textContent = "Mnemonic:";
  var child = document.createElement("p");
  child.textContent = mnemonic;
  p.appendChild(child);
  document.body.appendChild(p);

  var p = document.createElement("hr");
  document.body.appendChild(p);

  var seed = bip39.mnemonicToSeed(mnemonic);
  var root = bitcoin.HDNode.fromSeedBuffer(seed);

  for (var i = 0; i < 10; i++) {
    var path = "m/44'/0'/0'/0/" + i.toString();
    var dp = root.derivePath(path);

    var p = document.createElement("div");
    p.textContent = "BIP44 Path:     " + path;
    document.body.appendChild(p);

    var p = document.createElement("div");
    p.textContent = "The privateKey:  " + dp.keyPair.toWIF();
    document.body.appendChild(p);

    var p = document.createElement("div");
    p.textContent =
      "The publicKey:  " + dp.getPublicKeyBuffer().toString("hex");
    document.body.appendChild(p);

    var p = document.createElement("div");
    p.textContent = "The Address:  " + dp.getAddress();
    document.body.appendChild(p);

    if (i < 9) {
      var p = document.createElement("hr");
      document.body.appendChild(p);
    }
  }
} else {
  alert("Generate BIP39 mnemonic failed, please refresh page");
}
