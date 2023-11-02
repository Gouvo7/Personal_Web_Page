<?php
include_once('functions.php');
$db = connectDB();
?>


<html>
    <head>
        <meta charset="utf-8"/>
        <meta name="description" content="My personal website"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="author" content="Nektarios Gkouvousis"/>
        <title>Nektarios Gkouvousis</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="navigation.js"></script>
        <link rel="stylesheet" href="loading.css">
        <link rel="stylesheet" href="navbar.css">
        <link rel="stylesheet" href="style.css">
        
        <div class="topnav">
            <div class="logo">
                <img src="images/logo2.png">
            </div>
            <nav>
                <ul>
                    <li><a href="index.php">Home</a></li>
                    <li><a href="projects.php">Projects</a></li>
                    <li><a href="contact.php">Contact</a></li>
                </ul>
            </nav>
        </div>
    </head>
    <body class="test">
        <div class="contents">
            <h1 class="fade_in">My personal projects</h1>
            <br><br>
            <p class="fade_in">Throughout my adventure of learing software development, I have designed and built applications
                of all sorts of kind. Below, you can find some of my most recent and 
            worth looking projects.</p>
        </div>
        <br><br>
        <div class="projects">
            <?php 
                $query = "SELECT * FROM projs";
                $stmt = $db->query($query);
                $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
                // Loop through the retrieved items
                foreach ($projects as $project) {
                    $projectID = $project['proj_ID'];
                    $projName = $project['proj_Title'];
                    $projDesc = $project['proj_Desc'];
                    $projLink = $project['proj_Link'];
                    $projImg = $project['proj_template'];
            ?>
            
            <div class="item">
                <div class="fade_in">
                    <a href="project.php?project=<?php echo $projName; ?>">
                    <div class="image-container">
                        <h3>●  <?php echo $projName;?>  ●</h3>
                            <img src="images\<?php echo $projImg ?>">
                    </div>
                    </a>
                    <br>
                    <div class="contents">
                        <p class="fade_in"><?php echo $projDesc;?></p>
                    </div>
                </div>
            </div>
            <?php
            }
            ?>
        </div>
        
    </body>
</html>
