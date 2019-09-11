#!/usr/bin/expect

set cdbPath [lindex $argv 0]
set cdbDevice [lindex $argv 1]
set sopFilename [lindex $argv 2]

set timeout 1000
spawn $cdbPath -s $cdbDevice shell
expect {
  "root@" {send "su install\r"}
}
expect {
  "install@" {send "/usr/bin/ins-tool -siu /tmp/$sopFilename && exit\r"}
}
expect {
  "root@" {send "rm -f /tmp/$sopFilename && exit\r"}
}
expect eof