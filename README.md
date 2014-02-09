A project for representing essential points of privacy policies in a more user-friendly manner.

## Spec

* Data formats used in this toolchain are specified with [JSONSchema](http://json-schema.org/) in [specs](./specs)

## To run

* [Install the Mozilla Add-on SDK](https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Installation).
* In the unzipped directory, run `source bin/activate`
* Now from the git project directory, test by running: `cfx run`

If you use a particular version of a Firefox install, pass that as a flag to `cfx`; for Nick's laptop, that's:

`cfx run -b /Applications/FirefoxNightly.app/Contents/MacOS/firefox-bin`
