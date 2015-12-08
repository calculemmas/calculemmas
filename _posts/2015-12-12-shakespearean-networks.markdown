---
layout: post
title:  "Small World Networks in Shakespearean Drama"
date:   2015-12-01 10:24:24 -0500
categories: digital-humanities networks
comments: true
---

<!-- Cooccurrence css and js -->
<link rel="stylesheet" type="text/css" href="/css/cooccurrence.css">

<script type="text/javascript" src="https://s3.amazonaws.com/duhaime-shakespeare/js/d3.v2.min.js?2.8.1"></script>
<script type="text/javascript" src="https://s3.amazonaws.com/duhaime-shakespeare/js/jquery-1.7.2.min.js"></script>

<aside class="selection-menu" style="margin-top:20px;">
    <p>Play:
       <select class="play-menu form-group select-wrapper form-control" id="selected_json">
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/MND.json'">Midsummer-Nights_Dream</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/AWW.json'">Alls_Well</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Ant.json'">Antony_And_Cleopatra</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Cor.json'">Coriolanus</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Cym.json'">Cymbeline</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Ham.json'">Hamlet</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/JC.json'">Julius_Caesar</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Lr.json'">King_Lear</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/LLL.json'">Loves_Labours_Lost</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Mac.json'">Macbeth</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/MM.json'">Measure_For_Measure</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Ado.json'">Much_Ado</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Oth.json'">Othello</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Per.json'">Pericles</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Rom.json'">Romeo_And_Juliet</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Err.json'">Comedy_Of_Errors</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Jn.json'">King_John</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/MV.json'">Merchant_Of_Venice</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Wiv.json'">Merry_Wives_Of_Windsor</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Shr.json'">Taming_Of_The_Shrew</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Tmp.json'">Tempest</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/TGV.json'">Two_Gentlemen_Of_Verona</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/TNK.json'">Two_Noble_Kinsmen</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/WT.json'">Winters_Tale</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Tim.json'">Timon_Of_Athens</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Tit.json'">Titus_Andronicus</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/Tro.json'">Troilus_And_Cressida</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/TN.json'">Twelfth_Night</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/R2.json'">King_Richard_II</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/R3.json'">King_Richard_III</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/1H4.json'">Henry_IV_i</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/2H4.json'">Henry_IV_ii</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/H5.json'">King_Henry_V</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/1H6.json'">Henry_VI_i</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/2H6.json'">Henry_VI_ii</option>
            <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger/3H6.json'">Henry_VI_iii</option>
        </select>   
    
    Order:
        <select id="order">
            <option value="name">by Name</option>
            <option value="count">by Frequency</option>
            <option value="group">by Cluster</option>
        </select>

<cooccurrencePlot></cooccurrencePlot>

<script type="text/javascript" src="/js/cooccurrence.js"></script>

</p>
</aside>


<!-- Shakespeare gender networks css and js -->
<link rel="stylesheet" type="text/css" href="/css/shakespeareGenderNetworks.css">


<aside class="selection-menu" style="margin-top:20px;">
     
    <p>Play:
        <select class="play-menu form-group select-wrapper form-control" id="selected_json_two">
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/Tmp.json'">Tempest</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/MND.json'">Midsummer-Nights_Dream</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/AWW.json'">Alls_Well</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/Ant.json'">Antony_And_Cleopatra</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/Cor.json'">Coriolanus</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/Cym.json'">Cymbeline</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/Ham.json'">Hamlet</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/JC.json'">Julius_Caesar</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/Lr.json'">King_Lear</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/LLL.json'">Loves_Labours_Lost</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/Mac.json'">Macbeth</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/MM.json'">Measure_For_Measure</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/Ado.json'">Much_Ado</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/Oth.json'">Othello</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/Per.json'">Pericles</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/Rom.json'">Romeo_And_Juliet</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/Err.json'">Comedy_Of_Errors</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/Jn.json'">King_John</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/MV.json'">Merchant_Of_Venice</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/Wiv.json'">Merry_Wives_Of_Windsor</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/Shr.json'">Taming_Of_The_Shrew</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/TGV.json'">Two_Gentlemen_Of_Verona</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/TNK.json'">Two_Noble_Kinsmen</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/WT.json'">Winters_Tale</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/Tim.json'">Timon_Of_Athens</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/Tit.json'">Titus_Andronicus</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/Tro.json'">Troilus_And_Cressida</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/TN.json'">Twelfth_Night</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/R2.json'">King_Richard_II</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/R3.json'">King_Richard_III</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/1H4.json'">Henry_IV_i</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/2H4.json'">Henry_IV_ii</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/H5.json'">King_Henry_V</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/1H6.json'">Henry_VI_i</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/2H6.json'">Henry_VI_ii</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/3H6.json'">Henry_VI_iii</option>
        </select>
      </p>
</aside>

<div align="center" id="shakespeareGenderNetwork" style="height:600px;"></div>

<script type="text/javascript" src="/js/addTooltip.js"></script>
<script type="text/javascript" src="/js/shakespeareGenderNetworks.js"></script>

<script>
d3.json("https://s3.amazonaws.com/duhaime-shakespeare/folger-gender/Tmp.json", drawGraph); 

// handle on click event
d3.select('#selected_json_two').on('change', function() { 
  // erase old image
  d3.select("#shakespeareGenderNetwork").select("svg").remove(); 

  var new_json = eval(d3.select(this).property('value'));
  d3.json(new_json, drawGraph);
});
</script>

