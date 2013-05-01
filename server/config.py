import os
import sys

envkeys = ["GH_ID", "GH_SECRET", "G__ID", "G_EMAIL", "G_SECRET"]
this_module = sys.modules[__name__]
for key in envkeys:
    setattr(this_module, key, os.environ.get(key, None))
