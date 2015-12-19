---
layout: post
title:  "Visualizing Shakespearean Characters"
date:   2015-12-13 10:24:24 -0500
categories: digital-humanities shakespeare
comments: true
---

<script src="//d3js.org/d3.v3.min.js"></script>
<script type="text/javascript" src="https://s3.amazonaws.com/duhaime-shakespeare/js/jquery-1.7.2.min.js"></script>
<link rel="stylesheet" type="text/css" href="css/shakes_characters.css">

Some time ago, I was intrigued to discover that Shakespeare’s Histories have a noticeable lack of female characters [[link]][previous-shakes-post]. Since then, I’ve been curious to further explore the nuances of Shakespearean characters, paying particular respect to the gender dynamics of the Bard’s plays. This post is a quick sketch of some of the insights to which that curiosity has led.

To get a closer look at Shakespeare’s characters, I ran some analysis on the Folger Shakespeare Library’s gold-standard set of Shakespearean texts [[link]][folger-digital-library], all of which are encoded in fantastic XML markup that captures a number of character-level attributes, including gender. Using that markup, I extracted data for each character in Shakespeare’s plays, and then scoured through those features in search of patterns. All of the characters with an identified gender in this dataset are plotted below (mouseover for character name and source play):

<!-- Words Spoken by Character Entrance Plot -->
<div id="characterWords"></div>
<script src="/js/shakespearean_characters.js"></script>

Looking at this plot, we can see that the most prominent characters in Shakespearean drama are almost all well-known, titular males. There is also a noticeable inverse-relationship between a character’s prominence and the point in the play wherein that character is introduced. Looking more closely at the plot, I’ve further noticed that Shakespeare was curiously consistent in his treatment of characters who appear in multiple plays. In both <i>1 Henry IV</i> and <i>2 Henry IV</i>, for instance, Falstaff is given ~6,000 words and is introduced only a few hundred words into the work. Looking at the long tail, by contrast, one finds that among the outspoken characters introduced after the ~15,000 word mark—including Westmoreland and Bedford in <i>2 Henry IV</i>, and Cade, Clifford, and Iden from <i>2 Henry VI</i>—nearly all hail from Histories.

While the plot above gives one a birds’ eye view of Shakespeare’s characters, the plot doesn’t make it particularly easy to differentiate male and female character dynamics. As a step in this direction, the plot below visualizes character entrances by gender for each of Shakespeare's plays:

<!-- first and last entrance by gender plot -->
<div id="minMaxEntrance"></div>
<script async src="js/min_max_entrances.js"></script>

Examining at the distribution along the x-axis, we can see that male characters consistently enter the stage before female characters. An exception to this general rule may be found in the Comedies, as plays like <i>Taming of the Shrew</i>, <i>All’s Well that Ends Well</i>, and <i>Midsummer Nights’ Dream</i> begin with female characters on stage. Looking at the distribution along the y-axis, we can also see that for most plays, male characters continue to be introduced on stage long after the last female characters have been introduced.

Given the plots above, some might conclude that Shakespeare privileged male characters over female characters, as he introduced the former earlier and tended to give them more lines. There is evidence in the plays, however, that points in the opposite direction. Looking at Shakespeare’s minor characters, we see that the smallest and least significant roles in each play were almost universally assigned to males:

<!-- min and max words by gender plot -->
<div id="minMaxWords"></div>
<script async src="js/min_max_words.js"></script>

Here we see that even important males characters such as Fleance in <i>Macbeth</i> and Cornelius in <i>Hamlet</i> are given very few lines indeed, and the smallest female roles are consistently given more lines than the smallest male roles.

In sum, the plots above show that a number of heretofore undisclosed patterns emerge when we analyze Shakespeare’s characters in the aggregate. However, the plots above don’t show the connections between characters. One way to investigate these interconnections is through a co-occurrence matrix, in which each cell represents the degree to which two characters appear on stage concurrently:

<!-- character cooccurrence plot -->
<aside class="selection-menu" style="margin-top:20px;">
    <p>Play:
        <select class="play-menu form-group select-wrapper form-control" id="selected_json">
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/1H4.json'">Henry_IV_i</option> 
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/Ant.json'">Antony_And_Cleopatra</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/MND.json'">Midsummer-Nights_Dream</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/AWW.json'">Alls_Well</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/Cor.json'">Coriolanus</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/Cym.json'">Cymbeline</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/Ham.json'">Hamlet</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/JC.json'">Julius_Caesar</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/Lr.json'">King_Lear</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/LLL.json'">Loves_Labours_Lost</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/Mac.json'">Macbeth</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/MM.json'">Measure_For_Measure</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/Ado.json'">Much_Ado</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/Oth.json'">Othello</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/Per.json'">Pericles</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/Rom.json'">Romeo_And_Juliet</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/Err.json'">Comedy_Of_Errors</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/Jn.json'">King_John</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/MV.json'">Merchant_Of_Venice</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/Wiv.json'">Merry_Wives_Of_Windsor</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/Shr.json'">Taming_Of_The_Shrew</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/Tmp.json'">Tempest</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/TGV.json'">Two_Gentlemen_Of_Verona</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/TNK.json'">Two_Noble_Kinsmen</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/WT.json'">Winters_Tale</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/Tim.json'">Timon_Of_Athens</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/Tit.json'">Titus_Andronicus</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/Tro.json'">Troilus_And_Cressida</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/TN.json'">Twelfth_Night</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/R2.json'">King_Richard_II</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/R3.json'">King_Richard_III</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/2H4.json'">Henry_IV_ii</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/H5.json'">King_Henry_V</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/1H6.json'">Henry_VI_i</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/2H6.json'">Henry_VI_ii</option>
        <option value="'https://s3.amazonaws.com/duhaime-shakespeare/folger-json/3H6.json'">Henry_VI_iii</option>
    </select>   

    Order:
    <select class="play-menu form-group select-wrapper form-control" id="order">
        <option value="name">by Name</option>
        <option value="count">by Frequency</option>
        <option value="group">by Cluster</option>
        <option value="gender">by Gender</option>
    </select>
    
    Color:
    <select id="colorDropdown">
        <option value="gender">by Gender</option>
        <option value="cluster">by Cluster</option>
    </select>
</p>
</aside>

<div id="cooccurrence"></div>
<script async src="js/cooccurrence.js"></script>

<p>In this visualization, “Frequency” represents the number of times a character appears on stage, “Gender” is indicated by the markup within the Folger Shakespeare Digital Collection XML (red = female, blue = male, green = unspecified), and “Cluster” reflects the subgroup of characters with whom a given character regularly appears, as determined by a fast greedy modularity ranking algorithm. Interacting with this plot allows one to uncover a number of insights. In the first place, we can see that the Histories consistently feature more “clusters” of characters than do Comedies or Tragedies. That is to say, while Comedies tend to be wildly interconnected affairs, Histories tend to include many small, isolated groups of characters that interact rather little with each other.  Looking at the gender dynamics of these groups, we can also see that in Comedies such as <i>Merry Wives of Windsor</i> and Histories such as <i>Richard III</i> and <i>Henry V</i>, female characters tend to appear on stage together, almost creating a coherent collective over the course of the play.</p>

<p>Finally, a number of female characters—such as Queen Margaret in <i>2 Henry VI</i> and Adrianna in <i>Comedy of Errors</i>—appear on stage more frequently than any other character in their respective plays, despite the fact that they say fewer words than their respective plays' most outspoken characters. That is to say, their visual presence on stage is disproportionate to their verbal presence on stage. This raises a number of questions: To what extent were female characters meant to fulfill the role of a spectacle in Shakespearean drama? It’s difficult to imagine that the male players who acted as females projected authentic feminine voices. Did the limitations of imitative speech help mitigate the number of lines given to these prominent female characters? These and other questions remain to be explored in future work.</p> 

[previous-shakes-post]:http://douglasduhaime.com/blog/classifying-shakespearean-drama-with-sparse-feature-sets
[folger-digital-library]:http://www.folgerdigitaltexts.org/
