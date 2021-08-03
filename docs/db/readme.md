## 一些数据库操作记录

...

## 数据库导出 mongoexport

- -h:指明数据库宿主机的 IP
- -u:指明数据库的用户名
- -p:指明数据库的密码
- -d:指明数据库的名字
- -c:指明 collection 的名字
- -f:指明要导出那些列
- -o:指明到要导出的文件名
- -q:指明导出数据的过滤条件
- -f, --fields：代表集合中的字段，可以根据设置选择导出的字段；
- --type：代表导出输出的文件类型，包括 csv 和 json 文件；
- --skip：跳过指定数量的数据；
- --limit：读取指定数量的数据记录；
- --sort：对数据进行排序，可以通过参数指定排序的字段，并使用 1 和 -1 来指定排序的方式，其中 1 为升序排列，而-1 是用于降序排列,如 sort({KEY:1})。

```bash
mongoexport -d test -c accounts -u admin --authenticationDatabase admin --type json -o accounts.json
```

## 数据库导入 mongoimport

```bash
# test 库  accounts_copy 库 从accounts.dat导入
mongoimport -d test -c accounts_copy -u admin --authenticationDatabase admin --file accounts.dat
```
