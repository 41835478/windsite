select count(visits) 共计,visits 访问次数 from w_user group by visits;
select count(visits) 共计,visits 访问次数 from w_user group by visits order by count(visits) desc limit 30;
select concat(count(datediff(curdate(),last_visit)),'人') 共计, datediff(curdate(),last_visit) 未登录天数 from w_user  where datediff(curdate(),last_visit)>7 group by datediff(curdate(),last_visit) ;