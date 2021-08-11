import pandas as pd
import numpy as np
import os

#경로 지정
print('TT : Load Text')
Path = os.getcwd()
df = pd.read_csv(Path + '/utils/Timetable.csv')

#교실 위치
Loc_Clss = {
    '운동장' : 8,
    '255':1,
    '225':2,
    '421':3,
    '222':4,
    '0':1,
    '323':5,
    '216':6,
    '423':7,
    '백암관':8,
    '324':9,
    '420':10,
    '414':11,
    '223':12,
    '314':13,
    '404':14,
    '312':15,
    '407':16,
    '321':17,
    '422':18,
    '211':19,
    '415':20,
    '413':21,
    '322':22,
    '127':23,
    '302':24,
    '음악실':25,
    '214':26,
    '114':27,
    '???':1,
}


#교실 번호만 분할
def Split(inp_str):
    try:
        return str(inp_str.split('/')[1])
    except:
        return '0'

#교실 번호 > 노드 번호
def Str2Int(inp_str):
    return int(Loc_Clss[str(inp_str)])

#인덱싱
print('TT : Indexing')
arr = list(df.keys())
arr.remove('학번')
arr.remove('이름')
TimeArr = df[arr]

#함수 적용
print('TT : String Split')
TimeArr = TimeArr.applymap(Split)
print('TT : Convert String to Int ')
TimeArr = TimeArr.applymap(Str2Int)

#데이터 프레임 분리
Route_ARR = []
for i in range(len(TimeArr)):
    Route_ARR += [list(TimeArr.iloc[i])]

#데이터 자르기
Arr_Slice = []
for i in Route_ARR:
    #월
    Arr_Slice += [i[0:7]]
    #화
    Arr_Slice += [i[7:14]]
    #수
    Arr_Slice += [i[14:18]]
    #목
    Arr_Slice += [i[18:25]]
    #금
    Arr_Slice += [i[25:33]]
    if len(i) != 32:
        print(len(i))
        raise("TT : List Length Is Not 32")
    
def get():
    return TimeArr


def get_preprocess():
    return Arr_Slice


