from pytube import YouTube
from sys import argv
from moviepy.editor import *
from pydub import AudioSegment
from numpy.random import uniform
import numpy as np
import os

link = argv[1]
name = argv[2]
yt = YouTube(link)


print("Title", yt.title)
print("View:", yt.views)

yd = yt.streams.filter(adaptive=True, abr="160kbps").first()

yd.download("./downloads",filename=name+".mp3")
# current_directory = os.path.dirname(__file__)

# filename = "./downloads/"+ name +".mp3"

# sound = AudioSegment.from_file(filename)

# octaves = -0.5

# new_sample_rate = int(sound.frame_rate * (2.0 ** octaves))
# hipitch_sound = sound._spawn(sound.raw_data, overrides={'frame_rate': new_sample_rate})
# hipitch_sound = hipitch_sound.set_frame_rate(44100)
# hipitch_sound.speedup(playback_speed=0.68982630272952853598014888337469)
# #export / save pitch changed sound
# hipitch_sound.export(f"octave_{octaves}.mp3", format="mp3")
print("done")
# video = VideoFileClip("./downloads/"+name+".mp4")
# video.audio.max_volume()
# video.audio.write_audiofile(name+".mp3")
