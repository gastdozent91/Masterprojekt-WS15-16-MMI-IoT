# iot_pyGenerator

converter.py von ehoefig,
generator.py von eliasLerch

generator benutzt die daten in stout_22.daten
requires python 3.x

## Usage

```bash
# Sends bulks with 200 measurements in a loop
$ python3.4 generator.py --rabbitIP=localhost -l -b 200 STOUT_22.DAT
```
