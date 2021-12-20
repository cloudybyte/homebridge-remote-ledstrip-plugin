import sys
import pigpio

if len(sys.argv) < 7:
    sys.stderr.write("""usage: pwmhelper.py red_pin blue_pin green_pin red_value blue_value green_value

Example:

pwmhelper.py 17 24 22 0 0 0
""")
    sys.exit()

RED_PIN=int(sys.argv[1])
GREEN_PIN=int(sys.argv[2])
BLUE_PIN=int(sys.argv[3])
MAX_RANGE=255

RED_VALUE=int(sys.argv[4])
GREEN_VALUE=int(sys.argv[5])
BLUE_VALUE=int(sys.argv[6])

def set_color(red_intensity, green_intensity, blue_intensity):
    pi.set_PWM_dutycycle(RED_PIN, red_intensity);
    pi.set_PWM_dutycycle(GREEN_PIN, green_intensity);
    pi.set_PWM_dutycycle(BLUE_PIN, blue_intensity);

pi = pigpio.pi();

pi.set_PWM_range(RED_PIN, MAX_RANGE);
pi.set_PWM_range(GREEN_PIN, MAX_RANGE);
pi.set_PWM_range(BLUE_PIN, MAX_RANGE);


set_color(RED_VALUE, GREEN_VALUE, BLUE_VALUE)

pi.stop();
