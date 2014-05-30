(function(){

  "use strict";
  var items = 0;

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $("input, select").change(calculateTheatreExperience);
    $("input, select").change(getClassTotal);
    $("input, select").change(calculateTotal);
    $("#submit").click(buildUrl);
  }

  function addJazz4ToCost(){
    var $costTd = $("#jazz-4-cost");
    var $jazz4Selected = $("select.jazz-4 > option:selected");
    if ($jazz4Selected.val() === "none"){
      $costTd.text("$175");
    }else{
      $costTd.text("$200");
      return 210;
    }
  }



  function calculateTotal(){
    var total = 0;
    total += addJazz4ToCost();
    $('input:checkbox:checked').each(function(){
      var $cost = ($(this).closest("tr").find(".cost").text());
      var cost = $cost.replace("$", "");
      cost *= 1;
      total += cost;
    });
    $("#total").text(total);
    return total;
  }

  function getClassTotal(){
    var total = $('input:checkbox:checked').length;
    console.log(total);
    return total;
  }

  function calculateTheatreExperience(){
    var $costTd = $("#per-class-cost");
    var totalClasses = getClassTotal();
    if (totalClasses <= 5){
      switch (totalClasses) {
        case 1:
          $costTd.text("$130");
          break;
        case 2:
          $costTd.text("$100");
          break;
        case 3:
          $costTd.text("$90");
          break;
        case 4:
          $costTd.text("$80");
          break;
        case 5:
          $costTd.text("$70");
          break;
        default:
          $costTd.text("$130");
      }
    }
  }

  function buildCart(url){
    $('input:checkbox:checked').each(function(){
      items ++;
      var $product_id = $(this).attr("name");
      var $description = $(this).closest("tr").find("td").first().text();
      var $amount = ($(this).closest("tr").find(".cost").text());
      var amount = $amount.replace("$", "");
      amount *= 1;
      url += "&cart[items]["+items+"][desc]="+$description;
      url += "&cart[items]["+items+"][amount]="+amount;
      url += "&cart[items]["+items+"][product_id]="+$product_id;
      url += "&cart[items]["+items+"][quantity]=1";
    });
    return url;
  }

  function buildUrl(){
    var $name = $("input[name=name]").val();
    var url = "https://rcsf.trail-staging.us/widget?campaign_id=2834&schedule=0&success_url=http%3A//www.rochesterchristianschool.org/&cart[desc]=Camp"
    var $assistance = $("#assistance").is(":checked")
    url = buildCart(url);

    if ($assistance) {
      items ++;
      url += "&cart[items]["+items+"][amount]=0";
      url += "&cart[items]["+items+"][desc]=Assistance";
      url += "&cart[items]["+items+"][product_id]=payment_assistance";
      url += "&cart[items]["+items+"][quantity]=0";
    };

    if ($name !== "") {
      items ++;
      url += "&cart[items]["+items+"][notes]="+$name;
    }

    //window.location.href = url;
    console.log(url);
  }

})();
