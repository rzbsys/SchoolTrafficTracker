###############################
#       Dijkstra Distance     #
#      Tracking Algorithm     #
###############################


import heapq
import os

INF = 10e9  # 무한
Path = os.getcwd()


#txt 불러오기
print('Di : Load Text')
f = open(Path + '\\utils\\graph.txt', 'r')
data = f.read().split('\n')
f.close()

#데이터 개수 구하기
data_len = len(data)


#배열 생성
print('Di : Make Graph')
graph = [[] for _ in range(data_len + 10)]

for i in data:
    g_from, g_to, g_cost = map(int, i.split(' '))

    #양방향 그래프
    graph[g_from] += [[g_to, g_cost]]
    graph[g_to] += [[g_from, g_cost]]


#다익스트라 구현
def Dijkstra(start_node):
    #Heap 자료구조 생성 및 초기 설정
    hq = []
    dist = [INF for _ in range(data_len + 10)]
    hist = [-1 for _ in range(data_len + 10)]
    heapq.heappush(hq, (0, start_node))
    hist[start_node] = start_node
    while hq:
        g_cost, g_from = heapq.heappop(hq)

        if dist[g_from] >= g_cost:
            dist[g_from] = g_cost
            for i in graph[g_from]:
                new_g_cost = g_cost + i[1]
                if new_g_cost <= dist[i[0]]:
                    heapq.heappush(hq, (new_g_cost, i[0]))
                    hist[i[0]] = g_from
    return dist, hist


#노드로 경로 불러오기
def get_hist(start_node, goal_node):
    hist_arr = []

    _, hist = Dijkstra(start_node)
    search_now = goal_node
    while start_node != search_now:
        hist_arr += [search_now]
        search_now = hist[search_now]
    hist_arr += [search_now]
    hist_arr.reverse()

    return hist_arr

#배열로 경로 불러오기
def get_hist_with_list(tarr):
    print('Di : Get Route With List')
    nhist = []
    for i in tarr:
        hist_buf = []
        for t in range(len(i) - 1):
            b_arr = get_hist(i[t], i[t+1])
            hist_buf += b_arr[:len(b_arr) - 1]
        nhist += [hist_buf + [i[-1]]]
    return nhist



if __name__ == '__main__':
    print('시작 노드를 입력하세요. : ', end='')
    start = int(input())
    print('목표 노드를 입력하세요. : ', end='')
    end = int(input())
    print(get_hist(start, end))
