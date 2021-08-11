from flask import Flask, render_template, request
from utils.algorithm import get_hist_with_list
from utils.load_timetable import get_preprocess


#데이터 불러오기
Location = get_preprocess()
#경로 불러오기
Path = get_hist_with_list(Location)
print('return!')


app = Flask(__name__)


@app.route('/')
def main():
    return render_template('index.html')


@app.route('/get_route', methods=['POST'])
def get_route():
    return {'result': Path}


if __name__ == '__main__':
    app.run('0.0.0.0', port=80, debug=False)


