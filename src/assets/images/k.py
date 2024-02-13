import os

for count, f in enumerate(os.listdir()):
    f_name, f_ext = os.path.splitext(f)
    f_name = f_name.replace("Icon_", "").lower().replace("(advance)", "(advanced)")

    new_name = f'{f_name}{f_ext}'
    os.rename(f, new_name)