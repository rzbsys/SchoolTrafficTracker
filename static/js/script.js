var floor1 = [];
var floor2 = [];
var floor3 = [];
var floor4 = [];
var maxx = 0;

//문자로 되어있는 str을 숫자로 변경
function Str_To_Int(str) {
    if (str == "First") {
        return 1;
    } else if (str == "Second") {
        return 2;
    } else if (str == "Third") {
        return 3;
    } else {
        return 4;
    }
}

//각 층 노드 구하기
for (var i = 1; i <= 79; i++) {
    if (i <= 14) {
        floor1.push(i);
    } else if (i <= 31) {
        floor2.push(i);
    } else if (i <= 51) {
        floor3.push(i);
    } else if (i <= 51) {
        floor3.push(i);
    }
}
const floor = [floor1, floor2, floor3, floor4];

//두 점의 좌표를 주면 직선을 그림
function Draw_In_HTML(x1, y1, x2, y2) {
    if (x2 < x1) {
        var tmp;
        tmp = x2; x2 = x1; x1 = tmp;
        tmp = y2; y2 = y1; y1 = tmp;
    }

    var lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    var m = (y2 - y1) / (x2 - x1);

    var degree = Math.atan(m) * 180 / Math.PI;
    var html = "<div class='line' style='transform-origin: top left; transform: rotate(" + degree + "deg); width: " + lineLength + "px; height: 3px; position: absolute; top: " + y1 + "px; left: " + x1 + "px;'></div>";
    $('body').append(html);
}

//모든 직선을 지움
function Erase_All_Line() {
    $(".line").animate({
        'opacity': 0
    }, 300, () => {
        $(".line").remove();
    });
}

//Start 노드와 End 노드를 입력으로 받고 직선을 그림
function Draw_Line_With_Node(start, end) {
    if (floor[Str_To_Int($('#Sel_Floor').val()) - 1].indexOf(start) == -1) {
        return;
    }
    if (floor[Str_To_Int($('#Sel_Floor').val()) - 1].indexOf(end) == -1) {
        return;
    }

    const S_left = $('#N' + start).offset().left + ($('#N' + start).width() / 2);
    const S_top = $('#N' + start).offset().top + ($('#N' + start).height() / 2);
    const E_left = $('#N' + end).offset().left + ($('#N' + end).width() / 2);
    const E_top = $('#N' + end).offset().top + ($('#N' + end).height() / 2);
    Draw_In_HTML(S_left, S_top, E_left, E_top);
}

//다른 층으로 이동
$('#Sel_Floor').on('change', () => {
    Erase_All_Line();
    $('#Fourth').hide();
    $('#Second').hide();
    $('#Third').hide();
    $('#First').hide();
    $('#' + $('#Sel_Floor').val()).fadeIn();
});



$.ajax({
    url: '/get_route',
    type: 'POST',
    async: true,
    dataType: "JSON",
    success: function (data) {
        graph = data['result'];
        console.log(graph);
        console.log(graph.length);

        setTimeout(() => {
            for (var i = 0; i < graph.length; i++) {
                const buf = graph[i];
                for (var t = 0; t < buf.length - 1; t++) {
                    //Draw_Line_With_Node(buf[t], buf[t + 1]);
                    $('#N' + buf[t]).data('cnt', $('#N' + buf[t]).data('cnt') + 1);
                    maxx = ($('#N' + buf[t]).data('cnt') > maxx) ? $('#N' + buf[t]).data('cnt') : maxx;
                    console.log(i + '/' + graph.length + '|' + t);
                }
                $('.progress').text(i + '/' + graph.length);
            }
            for (var i = 1; i <= 79; i++) {
                if ($('#N' + i).data('cnt') == 0) {
                    $('#N' + i).css('background-color', 'rgb(240, 240, 240)');
                } else {
                    $('#N' + i).css('background-color', 'rgba(255, 0, 0,' + $('#N' + i).data('cnt') / maxx + ')');
                    if ($('#N' + i).data('cnt') / maxx > 0.5) {
                        $('#N' + i).css('color', 'white');
                    }
                }
            }

            
        $('#Fourth').hide();
        $('#Second').hide();
        $('#Third').hide();

        //로딩 효과
        $('body').css('transform', 'scale(1)');
        $('#Load').css('transform', 'scale(1)');
        $('#Load').css('height', '0px');

            
        }, 0);




    }
});
