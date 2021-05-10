

        //浠ヤ笅鏄爲鐨刯s____________________________________________
        var bool_jump=true;

        //鏃堕棿鐐规槸蹇呴』瑕侀€夋嫨鐨勶紝浜嬩欢鍜岃鏃舵柟寮忓彲浠ヤ笉鍐�
        var bool_timer=false;
        var hearttree_desc=start_content['hearttree_desc']; //鏄剧ず璁℃椂鍣ㄤ笂鐨勪簨浠�

        var hearttree_time=start_content['hearttree_time'];
        if(typeof(hearttree_time)!='undefined' && hearttree_time!=''){ //鏃堕棿鐐规槸蹇呴』瑕侀€夋嫨鐨�
            bool_timer=true;
        }
        if(start_content['bool_save']==false || typeof(hearttree_time)=='undefined'){
            hearttree_time='2010-05-19';
            bool_timer=true; //鍏ㄧ┖浣滃搧濡傛灉棰勮hearttree搴旇鏄剧ず璁℃椂
        }

        var hearttree_time_type=start_content['hearttree_time_type'];
        if(typeof(hearttree_time_type)=='undefined' || hearttree_time_type==''){
            hearttree_time_type='hearttree_postive';
        }

        $('#div_start_bg').height($(window).height());

        function init_hearttree(){
            console.log('init_hearttree'); 
            var canvas_tree = $('#canvas_tree');  
            if (!canvas_tree[0].getContext) { //濡傛灉涓嶆敮鎸佺敾甯冿紝鍒欐彁绀洪敊璇�
                $("#div_tree_error").show();
                $('#div_hearttree').remove(); //鏁翠綋鍒犻櫎
                init_theme(); //鐩存帴鏄剧ず涓婚
                return false; 
            }

            var width = canvas_tree.width();
            var height = canvas_tree.height();
            // canvas_tree.attr("width", width);
            // canvas_tree.attr("height", height);

            var opts = {
                seed: {
                    // x: width / 2 - 20, //鐢诲竷瀹藉害鐨勪竴鍗婂噺鍘�20
                    // y: height / 2 - 20, //鐢诲竷楂樺害鐨勪竴鍗婂噺鍘�20
                    color: "rgb(190, 26, 37)",
                    scale: 2
                },
                //绗�1灞傛槸1涓紝绗�2灞傛槸9涓紝绗�3灞傛槸5涓紝绗�4灞傞兘鏄�9涓垨8涓�
                //鍏跺疄浠ヤ笅鍙槸涓嶅悓灞傜骇鐨勬爲骞诧紝缁撴瀯涓€鏍蜂负
                //point1涓篬0,1], point2涓篬2,3], point3涓篬4,5], radius涓篬6], length涓篬7], branchs涓轰笅涓€灞傜骇
                branch: [
                    [235, 815, 270, 385, 200, 335, 30, 100, [
                        [240, 615, 155, 502, 80, 510, 13, 100, [ //宸︿笅鐨勬爲骞�
                            [180, 550, 154, 525, 144, 510, 2, 40] //宸︿笅鏍戝共鐨勬爲鏋�
                        ]],
                        [250, 580, 300, 491, 380, 480, 12, 100, [ //鍙充笅鏍戝共
                            [278, 535, 348, 544, 361, 561, 3, 80] //鍙充笅鏍戝共鐨勬爲鏋�
                        ]],
                        [235, 416, 237, 383, 234, 352, 3, 40], //涓棿鐨勫皬鏍戝共
                        [246, 532, 113, 382, 48, 379, 9, 80, [ //宸︿笂鐨勬爲骞�
                            [134, 421, 93, 388, 81, 338, 2, 40], //宸︿笂鏍戝共鐨勪笂鏍戞灊
                            [198, 480, 135, 450, 95, 465, 4, 60] //宸︿笂鏍戝共鐨勪笅鏍戞灊
                        ]],
                        [246, 492, 308, 387, 378, 356, 6, 100, [ //鍙充笂鐨勬爲骞�
                            [290, 428, 346, 412, 348, 406, 2, 80] //鍙充笂鏍戝共鐨勬爲鏋�
                        ]]
                    ]] 
                ],
                bloom: {
                    num: 700,
                    width: 500,
                    height: 880,
                },
                footer: {
                    width: 500,
                    height: 40,
                    speed: 5,
                }
            }

            var tree = new Tree(canvas_tree[0], width, height, opts); //瀹炰緥鍖杢ree瀵硅薄
            var seed = tree.seed;
            var foot = tree.footer;
            var hold = 1;

            $('#div_tree_start').click(function(e){
                var offset = canvas_tree.offset(); //榛樿閮芥槸0 
                var x; 
                var y;
                x = e.pageX - offset.left;
                y = e.pageY - offset.top;
                // console.log('offset.left->'+offset.left+'  offset.top->'+offset.top);
                // console.log('e.pageX->'+e.pageX+'  e.pageX->'+e.pageY);
                // console.log('x->'+x+'  y->'+y); 
                hold = 0; //鍏抽敭鐨勪竴姝ヤ綔涓鸿Е鍙�
                canvas_tree.unbind("click"); 
                canvas_tree.unbind("mousemove");
                canvas_tree.removeClass('hand'); 
                $('#div_tree_start').remove(); 
            });

            var seedAnimate = eval(Jscex.compile("async", function () { 
                seed.draw(); //杩欓噷灏卞畬鎴愪簡鍒濆鍖栫殑鐣岄潰浜嗭紝鏄剧ず涓€涓績褰�
                while (hold) { //濡傛灉涓�0灏辨墽琛�
                    $await(Jscex.Async.sleep(10));
                } 
                while (seed.canScale()) { //seed.canScale()浠庝竴寮€濮嬪氨鏄痶rue
                    seed.scale(0.95);
                    $await(Jscex.Async.sleep(10));
                }
                while (seed.canMove()) {
                    seed.move(0, 2);
                    foot.draw();
                    $await(Jscex.Async.sleep(10));
                }
            }));

            var growAnimate = eval(Jscex.compile("async", function () {
                do {
                    tree.grow();
                    $await(Jscex.Async.sleep(10));
                } while (tree.canGrow());
            }));

            var flowAnimate = eval(Jscex.compile("async", function () {
                do {
                    tree.flower(2);
                    $await(Jscex.Async.sleep(10));
                } while (tree.canFlower());
            }));

            var moveAnimate = eval(Jscex.compile("async", function () {
                tree.snapshot("p1", 0, 0, 610, 815); //function(k, x, y, width, height)
                while (tree.move("p1", 130, 0)) {
                    foot.draw();
                    $await(Jscex.Async.sleep(10));
                }
                foot.draw();
                tree.snapshot("p2", 130, 0, 610, 815);

                // 浼氭湁闂儊涓嶅緱鎰忚繖鏍峰仛, (锛烇箯锛�)
                canvas_tree.parent().css("background", "url(" + tree.toDataURL('image/png') + ")");
                // canvas_tree.css("background", "#ffe");
                $await(Jscex.Async.sleep(300));
                canvas_tree.css("background", "none");
            }));

            var jumpAnimate = eval(Jscex.compile("async", function () {
                var ctx = tree.ctx;
                while (bool_jump) {
                    tree.ctx.clearRect(0, 0, width, height);
                    tree.jump();
                    // foot.draw();
                    $await(Jscex.Async.sleep(25));
                }
            }));

            var textAnimate = eval(Jscex.compile("async", function () {
                $("#div_tree_text").show();
                hearttree_typed();
                
                if(bool_timer){
                    $('#div_tree_timer #span_tree_desc').html(hearttree_desc);
                    if(typeof(hearttree_desc)=='undefined' || hearttree_desc==''){ //澶勭悊鍏ㄧ┖浣滃搧
                        $('#div_tree_timer #span_tree_desc').html('鎴戜滑宸茬粡鍦ㄤ竴璧�');
                    }
                    $('#div_tree_timer').fadeIn();
                }

                if(bool_timer){
                    while (bool_jump) {
                        hearttree_timer(hearttree_time,hearttree_time_type);
                        $await(Jscex.Async.sleep(1000));
                    }
                }else{
                    while (bool_jump) {
                        $await(Jscex.Async.sleep(1000));
                    }
                } 
            }));

            var runAsync = eval(Jscex.compile("async", function () {
                $await(seedAnimate());
                $await(growAnimate());
                $await(flowAnimate());
                $await(moveAnimate());
                textAnimate().start();
                $await(jumpAnimate());
            }));
            runAsync().start();
        }

        function hearttree_typed(){
            console.log('hearttree_typed');
            if(typeof(start_content['hearttree_text'])=='undefined' || start_content['hearttree_text']==''){
                var str_start='璋㈠懡杩愶紝璁╀綘鎴戠浉閬�<br>浜庡崈涓囦汉涔嬩腑锛屽湪鏃跺厜鐨勮崚閲庨噷<br>涓嶆棭涔熶笉鏅氾紝鍒氬垰濂�<br>濂芥兂瀵逛綘璇达紝寰堥珮鍏撮亣瑙佷綘';
            }else{
                var str_start=start_content['hearttree_text'];
            }
            
            var hearttree_typed = new Typed('#span_tree_typed', {
                strings: [str_start], //杈撳叆鍐呭, 鏀寔html鏍囩
                typeSpeed: 150, //鎵撳瓧閫熷害
                cursorChar: '鉂�',//鏇挎崲鍏夋爣鐨勬牱寮�
                contentType: 'html', //鍊间负html鏃讹紝鐩存帴瑙ｆ瀽html鏍囩
                onComplete: function(abc){
                            // console.log(abc);
                            console.log('finished typing hearttree words');
                            setTimeout(function(){
                                bool_jump=false;  
                                $('#div_hearttree').fadeOut(); 
                            },3000); 
                            setTimeout(function(){ 
                                $('#div_hearttree').remove();
                                init_theme(); 
                            },3500); 
                        },
            });
        }


        function hearttree_timer(date_dest,type){
            var date_current = Date().replace(/-/g,"/");
            // console.log(date_current);
            date_dest_safe = new  Date(date_dest.replace(/-/g,"/"));
            // console.log(date_dest_safe);
            if(type=='hearttree_postive'){ //姝ｈ鏃惰繕鏄€掕鏃讹紝  +' GMT +8'鏄缃寳浜椂闂翠笢鍏尯
                var seconds = (Date.parse(date_current)-Date.parse(date_dest_safe))/1000;
            }else{
                var seconds = (Date.parse(date_dest_safe)-Date.parse(date_current))/1000;
            }
            var days = Math.floor(seconds/(3600*24));
            seconds = seconds%(3600*24);
            var hours = Math.floor(seconds/3600);
            if (hours<10) {
                hours="0"+hours;
            }
            seconds=seconds%3600;
            var minutes= Math.floor(seconds/60);
            if (minutes<10) {
                minutes="0"+minutes;
            }
            seconds = seconds%60;
            if (seconds<10) {
                seconds="0"+seconds;
            }
            var result = days+"澶� "+hours+ "灏忔椂 "+minutes+"鍒嗛挓 "+seconds+"绉�"; 
            $("#div_tree_interval").html(result);
        }



