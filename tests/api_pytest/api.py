import requests
import json
import subprocess
import time

server_process = None


def setup_function(function):
  global server_process
  server_process = subprocess.Popen(['foreman', 'start'])
  time.sleep(1)


def teardown_function(function):
  assert None == server_process.poll()
  server_process.terminate()
  server_process.wait()
  assert server_process.returncode == 0


def call_add(a, b):
  a = requests.get("http://localhost:5000/add?a=%d&b=%d" % (a, b))
  assert a.content
  assert a.status_code == 200
  a = json.loads(a.content)
  assert "res" in a
  return a["res"]


def test_add_ok():
  quarantedeux = call_add(20, 22)
  assert quarantedeux == 42


def test_add_negative():
  assert call_add(52, -10) == 42


def test_no_42():
  assert call_add(10, 14) == 24


def test_fail():
  assert call_add(10, 14) == 25
