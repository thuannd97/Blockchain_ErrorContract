App = {
    web3Provider: null,
    contract: null,
  
    init: function() {
      if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider;
      } else {
        // If no injected web3 instance is detected, fall back to Ganache
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      }
      web3 = new Web3(App.web3Provider);
  
      App.initContract();
    },
  
    initContract: function() {
      var mytokenContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[{"name":"initalSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"decimalUnits","type":"uint256"},{"name":"tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]);
      App.contract = mytokenContract.at("0x9c4438fe48a8a480f0c0bc7935f06a5427722422");
      $(document).on('click', '.transfer', App.transfer);
    },

    transfer: function(event){
        event.preventDefault();

        var to = $('input[id="to"]').val();
        var amount = $('input[id="value"').val();
        let contract = App.contract;
        
        contract.transfer(to, amount, {amount: web3.toWei(amount, "ether")}, function(err, result){
            if(!err){
                console.log(result);
            } else{
                console.log(err);
            }
        });
    },

  };
  
  $(function() {
    $(window).load(function() {
      App.init();
    });
  });
  