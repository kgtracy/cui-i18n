package com.covisint.cui.i18n;

import java.util.Locale;
import java.util.Map;
import java.util.TreeMap;
import java.io.PrintWriter;
import java.io.IOException;

public class ListCountry {

    private Map<String, String> languagesMap = new TreeMap<String, String>();
    public ListCountry() {
	// initLanguageMap();
    }

    public static void main(String[] args) {
	    ListCountry obj = new ListCountry();

	    // obj.getListOfCountries();
        obj.listCountriesLocale();
        //obj.countryExample(Locale.FRENCH);
    }

    public static void listCountriesLocale() {

        Locale locales[] = Locale.getAvailableLocales();
        String[] isoCountries = Locale.getISOCountries();

        for (String countryCode : isoCountries) {
            for (Locale locale : locales) {

//            try {
//                PrintWriter writer = new PrintWriter("./assets/json/"+localeObj.getCountry()+".json", "UTF-8");
//                writer.println("Test");
//                writer.close();
//            } catch (IOException e) {
//                System.out.println("Error writing to file: " + e);
//            }

                Locale localeObj = new Locale("", countryCode);
                System.out.println(localeObj.getCountry() + ":" + localeObj.getDisplayCountry(locale));
            }
        }
    }

    public void getListOfCountries() {

	    String[] countries = Locale.getISOCountries();

	    int supportedLocale = 0, nonSupportedLocale = 0;

	    for (String countryCode : countries) {

	        Locale obj = null;

	        if (languagesMap.get(countryCode) == null) {

		        obj = new Locale("", countryCode);
		        nonSupportedLocale++;

	        } else {

		        //create a Locale with own country's languages
		        obj = new Locale(languagesMap.get(countryCode), countryCode);
		        supportedLocale++;

	        }

            System.out.println("Country Code = " + obj.getCountry()
		        + ", Country Name = " + obj.getDisplayCountry(obj)
		        + ", Languages = " + obj.getDisplayLanguage());

        }

	    System.out.println("nonSupportedLocale : " + nonSupportedLocale);
	    System.out.println("supportedLocale : " + supportedLocale);

    }

    // create Map with country code and languages
    public void initLanguageMap() {

	    Locale[] locales = Locale.getAvailableLocales();

	    for (Locale obj : locales) {

	        if ((obj.getDisplayCountry() != null) && (!"".equals(obj.getDisplayCountry()))) {
		    languagesMap.put(obj.getCountry(), obj.getLanguage());
	        }

	    }

    }

}
