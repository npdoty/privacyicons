A project for representing essential points of privacy policies in a more user-friendly manner.

## Spec

* Data formats used in this toolchain are specified with [JSONSchema](http://json-schema.org/) in [specs](./specs)
 
## References

From "*Standardizing Privacy Notices: An Online Study of the Nutrition Label Approach,*" 

"Further work should concentrate on not just how to present policy information, but also on how to facilitate comparisons.  Levy and Hastak recommend continuing to provide better education and context to help consumers  make better decisions. While our attached list of definitions is a start, **framing the policy with contextual information and presenting comparisons in more useful ways would be productive directions to take future research in usable privacy policies**." 

P.G. Kelley, L.J. Cesca, J. Bresee, and L.F. Cranor.  *Standardizing Privacy Notices: An Online Study of the Nutrition Label Approach.*  CHI 2010.

[Ongoing list of related privacy icons / short notice efforts](https://pinboard.in/u:npdoty/t:privacy-icons/) [from Nick's pinboard]

## Documentation

[Explanation page for users](documentation.md)

### Screenshots

Screenshot of the extension with sample (faked/hard-coded) data:
<img src="images/screenshot-wikipedia-sample.png" alt="Screenshot of Wikipedia with sample policy information" height="400"/>

Screenshot of the extension parsing actual P3P-declared data:
<img src="images/screenshot-microsoft-p3p.png" alt="Screenshot of Microsoft with policy information from live P3P policy" height="400"/>


## To run

* [Install the Mozilla Add-on SDK](https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Installation).
* In the unzipped directory, run `source bin/activate`
* Now from the git project directory, test by running: `cfx run`

If you use a particular version of a Firefox install, pass that as a flag to `cfx`; for Nick's laptop, that's:

`cfx run -b /Applications/FirefoxNightly.app/Contents/MacOS/firefox-bin`
