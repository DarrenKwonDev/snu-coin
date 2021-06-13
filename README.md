## 기능 명세

-[x] 로그인/ 로그아웃이 가능하다.  
-[x] 본인의 자산을 확인 가능하다.  
-[x] 마켓의 오더북을 확인할 수 있다.  
-[x] 오더 북은 5초에 한번씩 업데이트 된다.  
-[x] 오더를 만들 수 있다.  
-[x] 오더를 취소할 수 있다.

### [GET] /orders

None => [orders]

### [DELETE] /orders/:order_id (:login_required)

None => order

### Order

status => -1, 0 ,1

기본 => 0
취소 => -1
체결완료 => 1
