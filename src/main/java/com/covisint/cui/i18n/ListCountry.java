package com.covisint.cui.i18n;

import java.util.Locale;
import java.io.PrintWriter;
import java.io.IOException;

public class ListCountry {

    public static void main(String[] args) {
	    ListCountry obj = new ListCountry();
        obj.ListCountriesLocale();
    }

    public static void ListCountriesLocale() {

        Locale locales[] = Locale.getAvailableLocales();
        String[] isoCountries = Locale.getISOCountries();
        String localeString;
        String[] displayCountryParts;

        for (Locale locale : locales) {

            localeString = locale.toString();

            if (localeString.length() == 2) {

                try {
                    PrintWriter writer = new PrintWriter("./assets/countries/"+localeString+".json", "UTF-8");
                    writer.println("[");
                    writer.flush();

                    for (int i = 0; i < isoCountries.length; i++) {

                        Locale localeObj = new Locale("", isoCountries[i]);

                        /* If last item in loop don't write comma at the end */
                        if (i == isoCountries.length - 1) {

                            /* Check if translation is in reverse comma case and fixes it */
                            if (localeObj.getDisplayCountry(locale).contains(",")) {
                                displayCountryParts = localeObj.getDisplayCountry(locale).split(",");

                                writer.println("{\n\"name\" : " + "\"" + displayCountryParts[1] + " " + displayCountryParts[0] + "\",");
                                writer.println("\"code\" : " + "\"" + localeObj.getCountry() + "\"\n}");
                                writer.flush();
                            }
                            else {
                                writer.println("{\n\"name\" : " + "\"" + localeObj.getDisplayCountry(locale) + "\",");
                                writer.println("\"code\" : " + "\"" + localeObj.getCountry() + "\"\n}");
                                writer.flush();
                            }

                        }
                        else {

                            /* Check if translation is in reverse comma case and fixes it */
                            if (localeObj.getDisplayCountry(locale).contains(",")) {
                                displayCountryParts = localeObj.getDisplayCountry(locale).split(",");
                                displayCountryParts[1] = displayCountryParts[1].substring(1);

                                writer.println("{\n\"name\" : " + "\"" + displayCountryParts[1] + " " + displayCountryParts[0] + "\",");
                                writer.println("\"code\" : " + "\"" + localeObj.getCountry() + "\"\n},");
                                writer.flush();
                            }
                            else {
                                writer.println("{\n\"name\" : " + "\"" + localeObj.getDisplayCountry(locale) + "\",");
                                writer.println("\"code\" : " + "\"" + localeObj.getCountry() + "\"\n},");
                                writer.flush();
                            }

                        }
                    }
                    writer.println("]");
                    writer.flush();
                    writer.close();

                } catch (IOException e) {
                    System.out.println("Error writing to file: " + e);
                }
            }
        }
    }
}
