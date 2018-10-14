App = {
    web3Provider: null,
    contract: null,

    init: function(){
        if(typeof web3 != "undefined"){
            App.web3Provider = web3.currentProvider;
        } else{
           console.log("null");
        }
        web3 = new Web3(App.web3Provider);
        App.initContract();
    }, 

    initContract: function(){
        var mytokenContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[{"name":"initalSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"decimalUnits","type":"uint256"},{"name":"tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]);
        App.contract = mytokenContract.at("0x9c4438fe48a8a480f0c0bc7935f06a5427722422");
        setInterval(App.updateState, 1000);
    },

    updateState: function(){
        let contract = App.contract;
        let coinBase = web3.eth.coinbase;
        $("#coin-base").text(coinBase);
        web3.eth.getBalance(coinBase, function(err, result){
            if(!err){
                $("#total-point").text(web3.fromWei(result.toNumber()) + " ETH" );
            } else{
                console.error(err);
            }
        });
        console.log(web3.eth.getBalance(coinBase));
    }



};

$(function(){
    $(window).load(function(){
        App.init()
    });
});