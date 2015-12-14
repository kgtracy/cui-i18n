package com.covisint.cui.i18n;

import java.util.Locale;
import java.io.PrintWriter;
import java.io.IOException;

public class ListCountry {

    public ListCountry() {
    }

    public static void main(String[] args) {
	    ListCountry obj = new ListCountry();
        obj.listCountriesLocale();
    }

    public static void listCountriesLocale() {

        Locale locales[] = Locale.getAvailableLocales();
        String[] isoCountries = Locale.getISOCountries();

        for (Locale locale : locales) {

            try {
                PrintWriter writer = new PrintWriter("./assets/json/"+locale+".json", "UTF-8");
                writer.println("[{");
                writer.flush();

                for (int i = 0; i < isoCountries.length; i++) {
                    Locale localeObj = new Locale("", isoCountries[i]);

                    if (i == isoCountries.length - 1) {
                        writer.println("\"" + localeObj.getCountry() + "\":\"" + localeObj.getDisplayCountry(locale) + "\"");
                        writer.flush();
                    }
                    else {
                        writer.println("\"" + localeObj.getCountry() + "\":\"" + localeObj.getDisplayCountry(locale) + "\",");
                        writer.flush();
                    }
                }
                writer.println("}]");
                writer.flush();
                writer.close();

            } catch (IOException e) {
                System.out.println("Error writing to file: " + e);
            }

        }
    }
}
