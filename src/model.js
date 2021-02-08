module.exports = {
    "interactionModel": {
        "languageModel": {
            "invocationName": "hochschule mensa",
            "intents": [
                {
                    "name": "AMAZON.CancelIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.HelpIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.StopIntent",
                    "samples": []
                },
                {
                    "name": "HelloWorldIntent",
                    "slots": [],
                    "samples": [
                        "hallo",
                        "wie geht's dir",
                        "sag hallo welt",
                        "sag hallo"
                    ]
                },
                {
                    "name": "AMAZON.NavigateHomeIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.FallbackIntent",
                    "samples": []
                },
                {
                    "name": "CanteenIntent",
                    "slots": [
                        {
                            "name": "SELECTED_CANTEEN",
                            "type": "LIST_OF_CANTEENS",
                            "samples": [
                                "{SELECTED_CANTEEN}"
                            ]
                        },
                        {
                            "name": "DATES",
                            "type": "AMAZON.DATE",
                            "samples": [
                                "{DATES}"
                            ]
                        }
                    ],
                    "samples": [
                        "was gibt es zu essen",
                        "was gibt es zu essen {DATES}",
                        "essen {DATES}",
                        "Was gibt es zu essen in der Mensa {SELECTED_CANTEEN} {DATES}",
                        "{DATES} menu {SELECTED_CANTEEN}",
                        "{DATES} essen {SELECTED_CANTEEN} ",
                        "essen Mensa {SELECTED_CANTEEN}  {DATES}"
                    ]
                },
                {
                    "name": "VegiCanteenIntent",
                    "slots": [
                        {
                            "name": "SELECTED_CANTEEN",
                            "type": "LIST_OF_CANTEENS",
                            "samples": [
                                "{SELECTED_CANTEEN}"
                            ]
                        },
                        {
                            "name": "DATES",
                            "type": "AMAZON.DATE",
                            "samples": [
                                "{DATES}"
                            ]
                        }
                    ],
                    "samples": [
                        "{SELECTED_CANTEEN} vegetarisch essen",
                        "vegetarisches essen {DATES}",
                        "vegetarisches Menü {DATES}",
                        "vegetarisches Menü in Mensa {SELECTED_CANTEEN} {DATES}",
                        "vegetarisches essen",
                        "vegeratisches essen in der Mensa {SELECTED_CANTEEN}"
                    ]
                },
                {
                    "name": "LibraryIntent",
                    "slots": [
                        {
                            "name": "bibliothek",
                            "type": "library",
                            "samples": [
                                "Der Name der Bibliothek lautet {bibliothek}",
                                "Der Name lautet {bibliothek}",
                                "{bibliothek}"
                            ]
                        }
                    ],
                    "samples": [
                        "Ist {bibliothek} belegt",
                        "Hat {bibliothek} freie Plätze",
                        "Ist {bibliothek} frei",
                        "Wie viele freie Plätze gibt es in {bibliothek}",
                        "Sind Plätze in {bibliothek} frei",
                        "Gibt es freie Plätze in {bibliothek}",
                        "Wie viele freie Plätze {bibliothek}"
                    ]
                },
                {
                    "name": "LibraryPlaceIntent",
                    "slots": [
                        {
                            "name": "bibliothek",
                            "type": "library",
                            "samples": [
                                "Der Name lautet {bibliothek}",
                                "Der Name der Bibliothek lautet {bibliothek}",
                                "{bibliothek}"
                            ]
                        }
                    ],
                    "samples": [
                        "Auf welcher Etage ist {bibliothek}",
                        "In welcher Etage ist {bibliothek}",
                        "Wo finde ich {bibliothek}",
                        "Wo genau ist {bibliothek}",
                        "In welchem Gebäude befindet sich {bibliothek}"
                    ]
                },
                {
                    "name": "NewsIntent",
                    "slots": [
                        {
                            "name": "COURSE_OF_STUDIES",
                            "type": "COURSE_OF_STUDIES"
                        },
                        {
                            "name": "NEWS_SELECTION",
                            "type": "NEWS_SELECTION"
                        },
                        {
                            "name": "DATES",
                            "type": "AMAZON.DATE"
                        }
                    ],
                    "samples": [
                        "was sind die Neuigkeiten für {COURSE_OF_STUDIES}",
                        "{COURSE_OF_STUDIES} schwarzes Brett neues {DATES}",
                        "Schwarzes Brett {COURSE_OF_STUDIES} neues {DATES}",
                        "was sind die Neuigkeiten für {COURSE_OF_STUDIES} {DATES}",
                        "Neues auf dem schwarzen Brett für {COURSE_OF_STUDIES}",
                        "Meldung {NEWS_SELECTION}",
                        "{NEWS_SELECTION} Meldung",
                        "{NEWS_SELECTION}",
                        "die {NEWS_SELECTION}",
                        "die {NEWS_SELECTION} Meldung"
                    ]
                },
                {
                    "name": "ScheduleTimeIntent",
                    "slots": [
                        {
                            "name": "course",
                            "type": "course"
                        },
                        {
                            "name": "lecture",
                            "type": "lecture"
                        },
                        {
                            "name": "groups",
                            "type": "groups"
                        }
                    ],
                    "samples": [
                        "{course} {groups} Wann findet {lecture} statt",
                        "Wann findet {lecture} statt {course} {groups}"
                    ]
                },
                {
                    "name": "ScheduleDateIntent",
                    "slots": [
                        {
                            "name": "course",
                            "type": "course"
                        },
                        {
                            "name": "groups",
                            "type": "groups"
                        },
                        {
                            "name": "lecture",
                            "type": "lecture"
                        },
                        {
                            "name": "date",
                            "type": "dates",
                            "samples": [
                                "{date}"
                            ]
                        }
                    ],
                    "samples": [
                        "{course} {groups} Wieviel uhr findet {lecture} {date} statt",
                        "{course} {groups} Wieviel uhr {date} findet {lecture} statt",
                        "{course} {groups} Wieviel uhr findet {date} {lecture} statt",
                        "Wieviel Uhr {date} findet {lecture} statt {course} {groups}",
                        "Wieviel Uhr findet {date} {lecture} statt {course} {groups}",
                        "Wieviel Uhr findet {lecture} {date} statt {course} {groups}"
                    ]
                },
                {
                    "name": "ScheduleRoomIntent",
                    "slots": [
                        {
                            "name": "lecture",
                            "type": "lecture"
                        },
                        {
                            "name": "course",
                            "type": "course"
                        },
                        {
                            "name": "groups",
                            "type": "groups"
                        },
                        {
                            "name": "date",
                            "type": "dates"
                        }
                    ],
                    "samples": [
                        "{course} {groups} Wo findet {lecture} {date} statt ",
                        "Wo findet {lecture} {date} statt {course} {groups}"
                    ]
                },
                {
                    "name": "ScheduleLecturerIntent",
                    "slots": [
                        {
                            "name": "course",
                            "type": "course",
                            "samples": [
                                "{course}"
                            ]
                        },
                        {
                            "name": "groups",
                            "type": "groups"
                        },
                        {
                            "name": "lecture",
                            "type": "lecture"
                        },
                        {
                            "name": "date",
                            "type": "dates"
                        }
                    ],
                    "samples": [
                        "Bei wem findet {lecture} {date} statt {course} {groups}",
                        "{course} {groups} Bei wem findet {lecture} {date} statt"
                    ]
                },
                {
                    "name": "ScheduleNextIntent",
                    "slots": [
                        {
                            "name": "wFrage",
                            "type": "wFrage"
                        },
                        {
                            "name": "course",
                            "type": "course"
                        },
                        {
                            "name": "semester",
                            "type": "semester"
                        },
                        {
                            "name": "groups",
                            "type": "groups"
                        }
                    ],
                    "samples": [
                        "{course} {semester} {groups} {wFrage} findet die nächste Vorlesung statt",
                        "{wFrage} findet die nächste Vorlesung statt {course} {semester} {groups}",
                        "{course} {semester} {groups} {wFrage} ist die nächste Vorlesung ",
                        "{wFrage} ist die nächste Vorlesung {course} {semester} {groups}"
                    ]
                },
                {
                    "name": "ScheduleLecturesIntent",
                    "slots": [
                        {
                            "name": "date",
                            "type": "dates"
                        },
                        {
                            "name": "semester",
                            "type": "semester"
                        },
                        {
                            "name": "groups",
                            "type": "groups"
                        },
                        {
                            "name": "course",
                            "type": "course",
                            "samples": [
                                "{course}"
                            ]
                        }
                    ],
                    "samples": [
                        "Welches Fach findet {date} statt {course} {semester} {groups}",
                        "Welche Fächer finden {date} statt {course} {semester} {groups}",
                        "Welche Vorlesung findet {date} statt {course} {semester} {groups}",
                        "{course} {semester} {groups} Welches Fach findet {date} statt",
                        "{course} {semester} {groups} Welche Fächer finden {date} statt",
                        "{course} {semester} {groups} Welche Vorlesung findet {date} statt",
                        "{course} {semester} {groups} Welche Vorlesungen finden {date} statt",
                        "Welche Vorlesungen finden {date} statt {course} {semester} {groups}"
                    ]
                },
                {
                    "name": "BuildingOpenedIntent",
                    "slots": [
                        {
                            "name": "article",
                            "type": "article"
                        },
                        {
                            "name": "learningplace",
                            "type": "library"
                        },
                        {
                            "name": "date",
                            "type": "dates"
                        },
                        {
                            "name": "general",
                            "type": "general"
                        },
                        {
                            "name": "office",
                            "type": "office"
                        }
                    ],
                    "samples": [
                        "Hat {article} {learningplace} {date} geöffnet",
                        "Wann öffnet {article} {learningplace}",
                        "{learningplace}  geöffnet",
                        "{general} geöffnet",
                        "{office} geöffnet",
                        "Wann öffnet {article} {office}",
                        "Wann öffnet {article} {general}",
                        "Hat {article} {office} {date} geöffnet",
                        "Hat {article} {general} {date} geöffnet"
                    ]
                },
                {
                    "name": "OpeningHoursIntent",
                    "slots": [
                        {
                            "name": "article",
                            "type": "article"
                        },
                        {
                            "name": "learningplace",
                            "type": "library"
                        },
                        {
                            "name": "general",
                            "type": "general"
                        },
                        {
                            "name": "office",
                            "type": "office"
                        }
                    ],
                    "samples": [
                        "Wie Öffnungszeiten {article} {learningplace}",
                        "Wie sind Öffnungszeiten {article} {learningplace}",
                        "Öffnungszeiten {article} {learningplace}",
                        "Wie sind Öffnungszeiten {article} {general}",
                        "Wie sind Öffnungszeiten {article} {office}",
                        "Öffnungszeiten {article} {general}",
                        "Öffnungszeiten {article} {office}",
                        "Wie Öffnungszeiten {article} {office}",
                        "Wann Öffnungszeiten {article} {general}"
                    ]
                },
                {
                    "name": "PersonIntent",
                    "slots": [
                        {
                            "name": "person",
                            "type": "person"
                        },
                        {
                            "name": "anrede",
                            "type": "anrede"
                        }
                    ],
                    "samples": [
                        "Wann findet die Sprechstunde von  {person} statt",
                        "Wo findet die Sprechstunde von  {person} statt",
                        "Wann ist die Sprechstunde von {person}",
                        "Wann ist die Sprechstunde von {anrede} {person}",
                        "Wo findet die Sprechstunde von {anrede} {person} statt",
                        "Wann findet die Sprechstunde von {anrede}  {person} statt"
                    ]
                },
                {
                    "name": "LaunchRequest"
                }
            ],
            "types": [
                {
                    "name": "library",
                    "values": [
                        {
                            "id": "FBH",
                            "name": {
                                "value": "Fachbibliothek Hochschule Karlsruhe",
                                "synonyms": [
                                    "fbh",
                                    "FBH"
                                ]
                            }
                        },
                        {
                            "id": "BIB-N",
                            "name": {
                                "value": "KIT-Bibliothek Nord",
                                "synonyms": [
                                    "bib-n",
                                    "BIB-N"
                                ]
                            }
                        },
                        {
                            "id": "FBA",
                            "name": {
                                "value": "Fakultätsbibliothek Architektur",
                                "synonyms": [
                                    "fba",
                                    "FBA"
                                ]
                            }
                        },
                        {
                            "id": "FBM",
                            "name": {
                                "value": "Mathematische Bibliothek",
                                "synonyms": [
                                    "fbm",
                                    "FBM"
                                ]
                            }
                        },
                        {
                            "id": "FBI",
                            "name": {
                                "value": "Informatikbibliothek",
                                "synonyms": [
                                    "fbi",
                                    "FBI"
                                ]
                            }
                        },
                        {
                            "id": "FBP",
                            "name": {
                                "value": "Fachbibliothek Physik",
                                "synonyms": [
                                    "fbp",
                                    "FBP"
                                ]
                            }
                        },
                        {
                            "id": "FBW",
                            "name": {
                                "value": "Wirtschaftswissenschaftliche Fakultätsbibliothek",
                                "synonyms": [
                                    "fbw",
                                    "FBW"
                                ]
                            }
                        },
                        {
                            "id": "LAF",
                            "name": {
                                "value": "Lernzentrum am Fasanenschlösschen",
                                "synonyms": [
                                    "laf",
                                    "LAF"
                                ]
                            }
                        },
                        {
                            "id": "FBC",
                            "name": {
                                "value": "Fachbibliothek Chemie",
                                "synonyms": [
                                    "fbc",
                                    "FBC"
                                ]
                            }
                        },
                        {
                            "id": "LBS",
                            "name": {
                                "value": "KIT-Bibliothek EG/1. OG Lehrbuchsammlung",
                                "synonyms": [
                                    "lbs",
                                    "LBS",
                                    "Lehrbuchsammlung"
                                ]
                            }
                        },
                        {
                            "id": "LSN",
                            "name": {
                                "value": "KIT-Bibliothek Süd 2. OG Lesesaal Naturwissenschaften",
                                "synonyms": [
                                    "lsn",
                                    "LSN",
                                    "Lesesaal Naturwissenschaften"
                                ]
                            }
                        },
                        {
                            "id": "LSW",
                            "name": {
                                "value": "KIT-Bibliothek Süd 1. OG Lesesaal Wirtschaftswissenschaften und Informatik",
                                "synonyms": [
                                    "lsw",
                                    "Lesesaal Wirtschaftswissenschaften und Informatik",
                                    "LSW"
                                ]
                            }
                        },
                        {
                            "id": "LST",
                            "name": {
                                "value": "KIT-Bibliothek Süd 2. OG Lesesaal Technik",
                                "synonyms": [
                                    "lst",
                                    "Lesesaal Technik",
                                    "LST"
                                ]
                            }
                        },
                        {
                            "id": "LSG",
                            "name": {
                                "value": "KIT-Bibliothek Süd 3. OG Lesesaal Geisteswissenschaften",
                                "synonyms": [
                                    "lsg",
                                    "Lesesaal Geisteswissenschaften",
                                    "LSG"
                                ]
                            }
                        }
                    ]
                },
                {
                    "name": "COURSE_OF_STUDIES",
                    "values": [
                        {
                            "name": {
                                "value": "MINB",
                                "synonyms": [
                                    "Medieninformatik Bachelor",
                                    "Medieninformatik"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "MKIB",
                                "synonyms": [
                                    "Medien- und Kommunikationsinformatik Bachelor",
                                    "Medien- und Kommunikationsinformatik"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "INFM",
                                "synonyms": [
                                    "Informatik Master"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "INFB",
                                "synonyms": [
                                    "Informatik",
                                    "Informatik Bachelor"
                                ]
                            }
                        }
                    ]
                },
                {
                    "name": "LIST_OF_CANTEENS",
                    "values": [
                        {
                            "id": "8",
                            "name": {
                                "value": "Pizzawerk"
                            }
                        },
                        {
                            "id": "7",
                            "name": {
                                "value": "Erzbergerstraße"
                            }
                        },
                        {
                            "id": "6",
                            "name": {
                                "value": "Schloss Gottesaue"
                            }
                        },
                        {
                            "id": "5",
                            "name": {
                                "value": "Cafeteria",
                                "synonyms": [
                                    "Cafeteria Moltkestraße"
                                ]
                            }
                        },
                        {
                            "id": "3",
                            "name": {
                                "value": "Adenauerring"
                            }
                        },
                        {
                            "id": "2",
                            "name": {
                                "value": "Tiefenbronner Straße"
                            }
                        },
                        {
                            "id": "1",
                            "name": {
                                "value": "Holzgartenstraße"
                            }
                        },
                        {
                            "id": "4",
                            "name": {
                                "value": "Moltke",
                                "synonyms": [
                                    "Mensa Moltke"
                                ]
                            }
                        }
                    ]
                },
                {
                    "name": "NEWS_SELECTION",
                    "values": [
                        {
                            "name": {
                                "value": "12",
                                "synonyms": [
                                    "zwölftens",
                                    "zwölfte",
                                    "zwölf"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "11",
                                "synonyms": [
                                    "elftens",
                                    "elfte",
                                    "elf"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "10",
                                "synonyms": [
                                    "zehntens",
                                    "zehnte",
                                    "zehn"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "9",
                                "synonyms": [
                                    "neuntens",
                                    "neunte",
                                    "neun"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "8",
                                "synonyms": [
                                    "achtens",
                                    "achte",
                                    "acht"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "7",
                                "synonyms": [
                                    "siebtens",
                                    "siebte",
                                    "sieben"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "6",
                                "synonyms": [
                                    "sechstens",
                                    "sechste",
                                    "sechs"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "5",
                                "synonyms": [
                                    "fünftens",
                                    "fünfte",
                                    "fünf"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "4",
                                "synonyms": [
                                    "viertens",
                                    "vierte",
                                    "vier"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "3",
                                "synonyms": [
                                    "drittens",
                                    "dritte",
                                    "drei"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "2",
                                "synonyms": [
                                    "zweitens",
                                    "zweite",
                                    "zwei"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "1",
                                "synonyms": [
                                    "erstens",
                                    "erste",
                                    "eins"
                                ]
                            }
                        }
                    ]
                },
                {
                    "name": "course",
                    "values": [
                        {
                            "id": "MKIB",
                            "name": {
                                "value": "Medien- und Kommunikationsinformatik",
                                "synonyms": [
                                    "Medien und Kommunikationsinfo",
                                    "Medien und Kommunikation",
                                    "MKIB",
                                    "MKI"
                                ]
                            }
                        },
                        {
                            "id": "MINB",
                            "name": {
                                "value": "Medieninformatik",
                                "synonyms": [
                                    "Medieninfo",
                                    "Medien",
                                    "MINB"
                                ]
                            }
                        },
                        {
                            "id": "INFM",
                            "name": {
                                "value": "Informatik Master",
                                "synonyms": [
                                    "Master Info",
                                    "Info Master",
                                    "INFM",
                                    "Master Informatik"
                                ]
                            }
                        },
                        {
                            "id": "INFB",
                            "name": {
                                "value": "Informatik Bachelor",
                                "synonyms": [
                                    "Bachelor Info",
                                    "Info Bachelor",
                                    "Bachelor Informatik",
                                    "Informatik",
                                    "INFB"
                                ]
                            }
                        }
                    ]
                },
                {
                    "name": "lecture",
                    "values": [
                        {
                            "id": "UserResearchMethoden",
                            "name": {
                                "value": "„Empathisch pragmatisch.“ User Research Methoden"
                            }
                        },
                        {
                            "id": "ABAP-Programmierung",
                            "name": {
                                "value": "ABAP-Programmierung"
                            }
                        },
                        {
                            "id": "Algo",
                            "name": {
                                "value": "Algorithmen und Datenstrukturen",
                                "synonyms": [
                                    "algo"
                                ]
                            }
                        },
                        {
                            "id": "AlgoÜbung",
                            "name": {
                                "value": "Algorithmen und Datenstrukturen Übung",
                                "synonyms": [
                                    "algo übung",
                                    "algo labor"
                                ]
                            }
                        },
                        {
                            "id": "Analysis",
                            "name": {
                                "value": "Analysis",
                                "synonyms": [
                                    "ana"
                                ]
                            }
                        },
                        {
                            "id": "AngewandteKryptographie",
                            "name": {
                                "value": "Angewandte Kryptographie"
                            }
                        },
                        {
                            "id": "App-Programmierung",
                            "name": {
                                "value": "App-Programmierung"
                            }
                        },
                        {
                            "id": "AugmentedVirtualReality",
                            "name": {
                                "value": "Augmented- und Virtual Reality"
                            }
                        },
                        {
                            "id": "AutonomeSysteme",
                            "name": {
                                "value": "Autonome Systeme"
                            }
                        },
                        {
                            "id": "AutonomeLabor",
                            "name": {
                                "value": "Autonome Systeme Labor"
                            }
                        },
                        {
                            "id": "Betriebssysteme",
                            "name": {
                                "value": "Betriebssysteme",
                                "synonyms": [
                                    "bs",
                                    "os"
                                ]
                            }
                        },
                        {
                            "id": "BetriebssystemeTutorium",
                            "name": {
                                "value": "Betriebssysteme (Tutorium)",
                                "synonyms": [
                                    "bs tut",
                                    "os tut",
                                    "betriebsysteme tut",
                                    "bs tutorium"
                                ]
                            }
                        },
                        {
                            "id": "BetriebssystemeÜbung",
                            "name": {
                                "value": "Betriebssysteme Übung",
                                "synonyms": [
                                    "bs lab",
                                    "bs labor",
                                    "bs übung",
                                    "os lab",
                                    "os labor",
                                    "os übung"
                                ]
                            }
                        },
                        {
                            "id": "Betriebswirtschaftslehre",
                            "name": {
                                "value": "Betriebswirtschaftslehre",
                                "synonyms": [
                                    "bwl"
                                ]
                            }
                        },
                        {
                            "id": "Bewegtbild",
                            "name": {
                                "value": "Bewegtbild"
                            }
                        },
                        {
                            "id": "CloudComputing",
                            "name": {
                                "value": "Cloud Computing"
                            }
                        },
                        {
                            "id": "Codierungstheorie",
                            "name": {
                                "value": "Codierungstheorie"
                            }
                        },
                        {
                            "id": "ComputerVision",
                            "name": {
                                "value": "Computer Vision"
                            }
                        },
                        {
                            "id": "Computergrafik",
                            "name": {
                                "value": "Computergrafik"
                            }
                        },
                        {
                            "id": "ComputergrafikLabor",
                            "name": {
                                "value": "Computergrafik Labor"
                            }
                        },
                        {
                            "id": "DataScience",
                            "name": {
                                "value": "Data Science"
                            }
                        },
                        {
                            "id": "Datenbanken1",
                            "name": {
                                "value": "Datenbanken 1",
                                "synonyms": [
                                    "db",
                                    "db 1",
                                    "datenbanken"
                                ]
                            }
                        },
                        {
                            "id": "Datenbanken1Labor",
                            "name": {
                                "value": "Datenbanken 1 Labor",
                                "synonyms": [
                                    "db labor",
                                    "db 1 labor",
                                    "db 1 übung",
                                    "db übung"
                                ]
                            }
                        },
                        {
                            "id": "Datenbanken2",
                            "name": {
                                "value": "Datenbanken 2"
                            }
                        },
                        {
                            "id": "Deklarative",
                            "name": {
                                "value": "Deklarative Programmierung Übung",
                                "synonyms": [
                                    "deklarative",
                                    "deklarative programmierung"
                                ]
                            }
                        },
                        {
                            "id": "DigitaleTransformation",
                            "name": {
                                "value": "Digitale Transformation & digitales Marketing"
                            }
                        },
                        {
                            "id": "Digital-Labor",
                            "name": {
                                "value": "Digital-Labor",
                                "synonyms": [
                                    "digital labor"
                                ]
                            }
                        },
                        {
                            "id": "EmbeddedSoftware",
                            "name": {
                                "value": "Embedded Software"
                            }
                        },
                        {
                            "id": "EmbeddedLabor",
                            "name": {
                                "value": "Embedded Software Labor"
                            }
                        },
                        {
                            "id": "ERP-Labor",
                            "name": {
                                "value": "ERP-Labor"
                            }
                        },
                        {
                            "id": "ERP-Systeme",
                            "name": {
                                "value": "ERP-Systeme"
                            }
                        },
                        {
                            "id": "Fremdsprachen",
                            "name": {
                                "value": "Fremdsprachen",
                                "synonyms": [
                                    "englisch",
                                    "english"
                                ]
                            }
                        },
                        {
                            "id": "GameDesign",
                            "name": {
                                "value": "Game Design + Development"
                            }
                        },
                        {
                            "id": "GameDesignÜbung",
                            "name": {
                                "value": "Game Design + Development Übung"
                            }
                        },
                        {
                            "id": "GameProgramming",
                            "name": {
                                "value": "Game Programming"
                            }
                        },
                        {
                            "id": "Graphenalgorithmen",
                            "name": {
                                "value": "Graphenalgorithmen"
                            }
                        },
                        {
                            "id": "HsKA-App",
                            "name": {
                                "value": "HsKA-App (HsKAmpus)"
                            }
                        },
                        {
                            "id": "InterculturalCommunication",
                            "name": {
                                "value": "Intercultural Communication"
                            }
                        },
                        {
                            "id": "Interfacedesign",
                            "name": {
                                "value": "Interfacedesign"
                            }
                        },
                        {
                            "id": "InterfacedesignÜbung",
                            "name": {
                                "value": "Interfacedesign Übung"
                            }
                        },
                        {
                            "id": "IntuitiveBenutzungsschnittstellen",
                            "name": {
                                "value": "Intuitive und Perzeptive Benutzungsschnittstellen"
                            }
                        },
                        {
                            "id": "IntuitiveBenutzungsschnittstellenÜbung",
                            "name": {
                                "value": "Intuitive und Perzeptive Benutzungsschnittstellen Übung"
                            }
                        },
                        {
                            "id": "ITProjektmanagement",
                            "name": {
                                "value": "IT Projektmanagement"
                            }
                        },
                        {
                            "id": "IT-Consulting",
                            "name": {
                                "value": "IT-Consulting"
                            }
                        },
                        {
                            "id": "IT-Entrepreneurship",
                            "name": {
                                "value": "IT-Entrepreneurship"
                            }
                        },
                        {
                            "id": "IT-Service-Management",
                            "name": {
                                "value": "IT-Service-Management",
                                "synonyms": [
                                    "itsm",
                                    "it service"
                                ]
                            }
                        },
                        {
                            "id": "IT-Sicherheit",
                            "name": {
                                "value": "IT-Sicherheit"
                            }
                        },
                        {
                            "id": "Kommunikationsnetze1",
                            "name": {
                                "value": "Kommunikationsnetze 1",
                                "synonyms": [
                                    "komm netze",
                                    "mokk netze 1"
                                ]
                            }
                        },
                        {
                            "id": "Kommunikationsnetze1Labor",
                            "name": {
                                "value": "Kommunikationsnetze 1 Labor",
                                "synonyms": [
                                    "komm netze labor",
                                    "komm netze übung",
                                    "komm netze 1 labor",
                                    "komm netze 1 übung"
                                ]
                            }
                        },
                        {
                            "id": "Kommunikationsnetze2",
                            "name": {
                                "value": "Kommunikationsnetze 2"
                            }
                        },
                        {
                            "id": "Konzeption,DesignundPräsentationvoninteraktivenProjekten",
                            "name": {
                                "value": "Konzeption, Design und Präsentation von interaktiven Projekten"
                            }
                        },
                        {
                            "id": "KünstlicheIntelligenz",
                            "name": {
                                "value": "Künstliche Intelligenz"
                            }
                        },
                        {
                            "id": "KünstlicheIntelligenzÜbung",
                            "name": {
                                "value": "Künstliche Intelligenz Übung"
                            }
                        },
                        {
                            "id": "MaschinellesLernen",
                            "name": {
                                "value": "Maschinelles Lernen"
                            }
                        },
                        {
                            "id": "MaschinellesLernenÜbung",
                            "name": {
                                "value": "Maschinelles Lernen Übung"
                            }
                        },
                        {
                            "id": "Mathe2StatistikTutorium",
                            "name": {
                                "value": "Mathe 2 Statistik Tutorium",
                                "synonyms": [
                                    "mathe 2 tut",
                                    "mathematik 2 tut",
                                    "mathematik 2 tutorium",
                                    "statistik tut",
                                    "statistik tutorium"
                                ]
                            }
                        },
                        {
                            "id": "Mathematik1",
                            "name": {
                                "value": "Mathematik 1",
                                "synonyms": [
                                    "mathe 1"
                                ]
                            }
                        },
                        {
                            "id": "Mathematik1Labor",
                            "name": {
                                "value": "Mathematik 1 Labor",
                                "synonyms": [
                                    "mathe 1 labor",
                                    "mathe labor",
                                    "mathe"
                                ]
                            }
                        },
                        {
                            "id": "MathematikfürMaschinellesLernen",
                            "name": {
                                "value": "Mathematik für Maschinelles Lernen"
                            }
                        },
                        {
                            "id": "Mediengestaltung",
                            "name": {
                                "value": "Mediengestaltung"
                            }
                        },
                        {
                            "id": "MediengestaltungÜbung",
                            "name": {
                                "value": "Mediengestaltung Übung"
                            }
                        },
                        {
                            "id": "Medienprojekt",
                            "name": {
                                "value": "Medienprojekt"
                            }
                        },
                        {
                            "id": "Medienprojekt2",
                            "name": {
                                "value": "Medienprojekt 2"
                            }
                        },
                        {
                            "id": "Medienprojekt2Übung",
                            "name": {
                                "value": "Medienprojekt 2 Übung"
                            }
                        },
                        {
                            "id": "MedienprojektÜbung",
                            "name": {
                                "value": "Medienprojekt Übung"
                            }
                        },
                        {
                            "id": "Medientechnik",
                            "name": {
                                "value": "Medientechnik"
                            }
                        },
                        {
                            "id": "MedientechnikLabor",
                            "name": {
                                "value": "Medientechnik Labor"
                            }
                        },
                        {
                            "id": "Mensch-Maschine-Kommunikation",
                            "name": {
                                "value": "Mensch-Maschine-Kommunikation"
                            }
                        },
                        {
                            "id": "Microservices",
                            "name": {
                                "value": "Microservices"
                            }
                        },
                        {
                            "id": "MMKEntwurf",
                            "name": {
                                "value": "MMK Entwurf"
                            }
                        },
                        {
                            "id": "MobileSysteme",
                            "name": {
                                "value": "Mobile Systeme"
                            }
                        },
                        {
                            "id": "Mobilkommunikation",
                            "name": {
                                "value": "Mobilkommunikation"
                            }
                        },
                        {
                            "id": "ModellbasierteSoftwareentwicklung",
                            "name": {
                                "value": "Modellbasierte Softwareentwicklung"
                            }
                        },
                        {
                            "id": "ModellierungundSimulation",
                            "name": {
                                "value": "Modellierung und Simulation"
                            }
                        },
                        {
                            "id": "ModellierungundSimulationÜbung",
                            "name": {
                                "value": "Modellierung und Simulation Übung"
                            }
                        },
                        {
                            "id": "Optimierung",
                            "name": {
                                "value": "Optimierung"
                            }
                        },
                        {
                            "id": "OptimierungÜbung",
                            "name": {
                                "value": "Optimierung Übung"
                            }
                        },
                        {
                            "id": "OptimierungvonProgrammen",
                            "name": {
                                "value": "Optimierung von Programmen"
                            }
                        },
                        {
                            "id": "OptimierungvonProgrammenÜbung",
                            "name": {
                                "value": "Optimierung von Programmen Übung"
                            }
                        },
                        {
                            "id": "ParalleleProgrammierungLabor",
                            "name": {
                                "value": "Parallele Programmierung Labor"
                            }
                        },
                        {
                            "id": "Praxisnachbereitung",
                            "name": {
                                "value": "Praxisnachbereitung"
                            }
                        },
                        {
                            "id": "Praxisvorbereitung",
                            "name": {
                                "value": "Praxisvorbereitung"
                            }
                        },
                        {
                            "id": "PraxisvorbereitungTeilScrum",
                            "name": {
                                "value": "Praxisvorbereitung Teil Scrum"
                            }
                        },
                        {
                            "id": "Programmieren",
                            "name": {
                                "value": "Programmieren"
                            }
                        },
                        {
                            "id": "ProgrammierenÜbung",
                            "name": {
                                "value": "Programmieren Übung",
                                "synonyms": [
                                    "programmieren labor"
                                ]
                            }
                        },
                        {
                            "id": "Programmierparadigmen",
                            "name": {
                                "value": "Programmierparadigmen"
                            }
                        },
                        {
                            "id": "Projektmanagement",
                            "name": {
                                "value": "Projektmanagement"
                            }
                        },
                        {
                            "id": "Qualitätssicherung",
                            "name": {
                                "value": "Qualitätssicherung"
                            }
                        },
                        {
                            "id": "Rechnerarchitektur",
                            "name": {
                                "value": "Rechnerarchitektur"
                            }
                        },
                        {
                            "id": "Recht",
                            "name": {
                                "value": "Recht"
                            }
                        },
                        {
                            "id": "ReinforcementLearning",
                            "name": {
                                "value": "Reinforcement Learning"
                            }
                        },
                        {
                            "id": "Rhetorik",
                            "name": {
                                "value": "Rhetorik"
                            }
                        },
                        {
                            "id": "Robotics-TheoryandPractice",
                            "name": {
                                "value": "Robotics - Theory and Practice"
                            }
                        },
                        {
                            "id": "RZ-Betrieb",
                            "name": {
                                "value": "RZ-Betrieb"
                            }
                        },
                        {
                            "id": "SAP-Zertifizierung",
                            "name": {
                                "value": "SAP-Zertifizierung"
                            }
                        },
                        {
                            "id": "SemanticTechnologies",
                            "name": {
                                "value": "Semantic Technologies"
                            }
                        },
                        {
                            "id": "SemanticTechnologiesLaboratory",
                            "name": {
                                "value": "Semantic Technologies Laboratory"
                            }
                        },
                        {
                            "id": "SeminarTechnologiegestütztesLernen-TGL",
                            "name": {
                                "value": "Seminar Technologiegestütztes Lernen - TGL"
                            }
                        },
                        {
                            "id": "SeriousGames",
                            "name": {
                                "value": "Serious Games"
                            }
                        },
                        {
                            "id": "Software-Architekturen",
                            "name": {
                                "value": "Software-Architekturen"
                            }
                        },
                        {
                            "id": "Software-ArchitekturenLabor",
                            "name": {
                                "value": "Software-Architekturen Labor"
                            }
                        },
                        {
                            "id": "Softwareengineering",
                            "name": {
                                "value": "Softwareengineering"
                            }
                        },
                        {
                            "id": "SoftwareengineeringLabor",
                            "name": {
                                "value": "Softwareengineering Labor"
                            }
                        },
                        {
                            "id": "Softwareprojekt",
                            "name": {
                                "value": "Softwareprojekt",
                                "synonyms": [
                                    "software"
                                ]
                            }
                        },
                        {
                            "id": "SoftwareprojektÜbung",
                            "name": {
                                "value": "Softwareprojekt Übung",
                                "synonyms": [
                                    "software labor",
                                    "software übung"
                                ]
                            }
                        },
                        {
                            "id": "SpezSoftwareengineering",
                            "name": {
                                "value": "Spezielle Kapitel Softwareengineering"
                            }
                        },
                        {
                            "id": "Statistik",
                            "name": {
                                "value": "Statistik",
                                "synonyms": [
                                    "mathe 2",
                                    "mathematik 2"
                                ]
                            }
                        },
                        {
                            "id": "TI1",
                            "name": {
                                "value": "Technische Informatik 1",
                                "synonyms": [
                                    "ti 1",
                                    "ti"
                                ]
                            }
                        },
                        {
                            "id": "TI1Übung",
                            "name": {
                                "value": "Technische Informatik 1 Übung",
                                "synonyms": [
                                    "ti 1 labor",
                                    "ti labor",
                                    "ti 1 übung",
                                    "ti übung"
                                ]
                            }
                        },
                        {
                            "id": "TI2",
                            "name": {
                                "value": "Technische Informatik 2",
                                "synonyms": [
                                    "ti 2"
                                ]
                            }
                        },
                        {
                            "id": "Theo",
                            "name": {
                                "value": "Theoretische Informatik"
                            }
                        },
                        {
                            "id": "TheoSprechstunde",
                            "name": {
                                "value": "Theoretische Informatik (Sprechstunde)"
                            }
                        },
                        {
                            "id": "Theo1",
                            "name": {
                                "value": "Theoretische Informatik 1",
                                "synonyms": [
                                    "theo 1"
                                ]
                            }
                        },
                        {
                            "id": "Theo1Sprechstunde",
                            "name": {
                                "value": "Theoretische Informatik 1 (Sprechstunde)",
                                "synonyms": [
                                    "theo 1 sprechstunde"
                                ]
                            }
                        },
                        {
                            "id": "Theo2",
                            "name": {
                                "value": "Theoretische Informatik 2",
                                "synonyms": [
                                    "theo 2"
                                ]
                            }
                        },
                        {
                            "id": "VS",
                            "name": {
                                "value": "Verteilte Systeme"
                            }
                        },
                        {
                            "id": "VS1",
                            "name": {
                                "value": "Verteilte Systeme 1",
                                "synonyms": [
                                    "verteilte"
                                ]
                            }
                        },
                        {
                            "id": "VS1Labor",
                            "name": {
                                "value": "Verteilte Systeme 1 Labor",
                                "synonyms": [
                                    "verteilte labor",
                                    "verteilete systeme übung",
                                    "verteilte übung"
                                ]
                            }
                        },
                        {
                            "id": "VS2",
                            "name": {
                                "value": "Verteilte Systeme 2"
                            }
                        },
                        {
                            "id": "VS2Labor",
                            "name": {
                                "value": "Verteilte Systeme 2 Labor"
                            }
                        },
                        {
                            "id": "VSLabor",
                            "name": {
                                "value": "Verteilte Systeme Labor"
                            }
                        },
                        {
                            "id": "WahrnehmungsbasierteInteraktion",
                            "name": {
                                "value": "Wahrnehmungsbasierte Interaktion"
                            }
                        },
                        {
                            "id": "WahrnehmungsbasierteÜbung",
                            "name": {
                                "value": "Wahrnehmungsbasierte Interaktion Übung"
                            }
                        }
                    ]
                },
                {
                    "name": "semester",
                    "values": [
                        {
                            "id": "7",
                            "name": {
                                "value": "7"
                            }
                        },
                        {
                            "id": "6",
                            "name": {
                                "value": "6"
                            }
                        },
                        {
                            "id": "5",
                            "name": {
                                "value": "5"
                            }
                        },
                        {
                            "id": "4",
                            "name": {
                                "value": "4"
                            }
                        },
                        {
                            "id": "3",
                            "name": {
                                "value": "3"
                            }
                        },
                        {
                            "id": "2",
                            "name": {
                                "value": "2"
                            }
                        },
                        {
                            "id": "1",
                            "name": {
                                "value": "1"
                            }
                        }
                    ]
                },
                {
                    "name": "groups",
                    "values": [
                        {
                            "id": "M2",
                            "name": {
                                "value": "M2",
                                "synonyms": [
                                    "m zwei",
                                    "m. zwei",
                                    "m2",
                                    "m 2"
                                ]
                            }
                        },
                        {
                            "id": "M1",
                            "name": {
                                "value": "M1",
                                "synonyms": [
                                    "m eins",
                                    "m. eins",
                                    "m 1",
                                    "m1"
                                ]
                            }
                        },
                        {
                            "id": "B2",
                            "name": {
                                "value": "B2",
                                "synonyms": [
                                    "b. zwei",
                                    "b zwei",
                                    "b 2",
                                    "b2"
                                ]
                            }
                        },
                        {
                            "id": "B1",
                            "name": {
                                "value": "B1",
                                "synonyms": [
                                    "b. eins",
                                    "b eins",
                                    "b 1",
                                    "b1"
                                ]
                            }
                        },
                        {
                            "id": "0",
                            "name": {
                                "value": "0",
                                "synonyms": [
                                    "no group",
                                    "keine gruppe",
                                    "keine",
                                    "null",
                                    "zero"
                                ]
                            }
                        }
                    ]
                },
                {
                    "name": "room",
                    "values": [
                        {
                            "id": "203",
                            "name": {
                                "value": "203",
                                "synonyms": [
                                    "Poolraum",
                                    "zweihundertdrei",
                                    "203",
                                    "zwei null drei"
                                ]
                            }
                        },
                        {
                            "id": "202",
                            "name": {
                                "value": "202",
                                "synonyms": [
                                    "zweihundertzwei",
                                    "202",
                                    "zwei null zwei"
                                ]
                            }
                        },
                        {
                            "id": "201",
                            "name": {
                                "value": "201",
                                "synonyms": [
                                    "zweihunderteins",
                                    "201",
                                    "zwei null eins"
                                ]
                            }
                        },
                        {
                            "id": "303",
                            "name": {
                                "value": "303",
                                "synonyms": [
                                    "Hörsaal",
                                    "dreihundertdrei",
                                    "303",
                                    "drei null drei"
                                ]
                            }
                        },
                        {
                            "id": "302",
                            "name": {
                                "value": "302",
                                "synonyms": [
                                    "302",
                                    "dreihunderzwei",
                                    "drei null zwei"
                                ]
                            }
                        },
                        {
                            "id": "301",
                            "name": {
                                "value": "301",
                                "synonyms": [
                                    "dreihunderteins",
                                    "301",
                                    "drei null eins"
                                ]
                            }
                        }
                    ]
                },
                {
                    "name": "building",
                    "values": [
                        {
                            "id": "A",
                            "name": {
                                "value": "A",
                                "synonyms": [
                                    "a gebäude"
                                ]
                            }
                        },
                        {
                            "id": "Li",
                            "name": {
                                "value": "Li",
                                "synonyms": [
                                    "li gebäude"
                                ]
                            }
                        },
                        {
                            "id": "E",
                            "name": {
                                "value": "E",
                                "synonyms": [
                                    "e gebäude"
                                ]
                            }
                        }
                    ]
                },
                {
                    "name": "wFrage",
                    "values": [
                        {
                            "id": "1",
                            "name": {
                                "value": "was",
                                "synonyms": [
                                    "welche"
                                ]
                            }
                        },
                        {
                            "id": "4",
                            "name": {
                                "value": "bei wem",
                                "synonyms": [
                                    "wessen"
                                ]
                            }
                        },
                        {
                            "id": "3",
                            "name": {
                                "value": "wo"
                            }
                        },
                        {
                            "id": "2",
                            "name": {
                                "value": "wann",
                                "synonyms": [
                                    "wieviel uhr",
                                    "an welchem tag",
                                    "um wieviel uhr"
                                ]
                            }
                        }
                    ]
                },
                {
                    "name": "dates",
                    "values": [
                        {
                            "id": "9",
                            "name": {
                                "value": "übermorgen"
                            }
                        },
                        {
                            "id": "8",
                            "name": {
                                "value": "morgen"
                            }
                        },
                        {
                            "id": "7",
                            "name": {
                                "value": "heute"
                            }
                        },
                        {
                            "id": "6",
                            "name": {
                                "value": "am sonntag",
                                "synonyms": [
                                    "sonntag",
                                    "sonntags",
                                    "diesen sonntag",
                                    "nächsten sonntag"
                                ]
                            }
                        },
                        {
                            "id": "5",
                            "name": {
                                "value": "am samstag",
                                "synonyms": [
                                    "samstag",
                                    "samstags",
                                    "diesen samstag",
                                    "nächsten samstag"
                                ]
                            }
                        },
                        {
                            "id": "4",
                            "name": {
                                "value": "am freitag",
                                "synonyms": [
                                    "freitag",
                                    "freitags",
                                    "diesen freitag",
                                    "nächsten freitag"
                                ]
                            }
                        },
                        {
                            "id": "3",
                            "name": {
                                "value": "am donnerstag",
                                "synonyms": [
                                    "donnerstag",
                                    "donnerstags",
                                    "diesen donnerstag",
                                    "nächsten donnersatg"
                                ]
                            }
                        },
                        {
                            "id": "2",
                            "name": {
                                "value": "am mittwoch",
                                "synonyms": [
                                    "mittwoch",
                                    "mittwochs",
                                    "diesen mittwoch",
                                    "nächsten mittwoch"
                                ]
                            }
                        },
                        {
                            "id": "1",
                            "name": {
                                "value": "am dienstag",
                                "synonyms": [
                                    "dienstag",
                                    "dienstags",
                                    "diesen dienstag",
                                    "nächsten dienstag"
                                ]
                            }
                        },
                        {
                            "id": "0",
                            "name": {
                                "value": "am Montag",
                                "synonyms": [
                                    "montag",
                                    "montags",
                                    "diesen montag",
                                    "nächsten"
                                ]
                            }
                        }
                    ]
                },
                {
                    "name": "general",
                    "values": [
                        {
                            "id": "13",
                            "name": {
                                "value": "Service-Center Studium und Lehre"
                            }
                        },
                        {
                            "id": "12",
                            "name": {
                                "value": "Sekretariat Institut für Fremdsprachen",
                                "synonyms": [
                                    "Sektretariat für Fremdsprachen",
                                    "Institut für Fremdsprachen"
                                ]
                            }
                        },
                        {
                            "id": "11",
                            "name": {
                                "value": "Copy-Shop"
                            }
                        },
                        {
                            "id": "10",
                            "name": {
                                "value": " Mensa"
                            }
                        },
                        {
                            "id": "9",
                            "name": {
                                "value": "Koordinierungsstelle für alle Praktischen Studiensemester",
                                "synonyms": [
                                    "Koordinierungsstelle"
                                ]
                            }
                        },
                        {
                            "id": "8",
                            "name": {
                                "value": "Studentische Abteilung",
                                "synonyms": [
                                    "Studentischen Abteilung"
                                ]
                            }
                        },
                        {
                            "id": "6",
                            "name": {
                                "value": "Fachbibliothek Hochschule Karlsruhe"
                            }
                        },
                        {
                            "id": "4",
                            "name": {
                                "value": "Cafeteria"
                            }
                        },
                        {
                            "id": "2",
                            "name": {
                                "value": "Akademisches Auslandsamt",
                                "synonyms": [
                                    "Akademischen Auslandsamtes"
                                ]
                            }
                        },
                        {
                            "id": "1",
                            "name": {
                                "value": "AStA - Studierendenschaft HsKA",
                                "synonyms": [
                                    "Asta"
                                ]
                            }
                        },
                        {
                            "id": "7",
                            "name": {
                                "value": "Informationszentrum Benutzerberatung",
                                "synonyms": [
                                    "Informationszentrum"
                                ]
                            }
                        },
                        {
                            "id": "5",
                            "name": {
                                "value": "Center of Competence"
                            }
                        },
                        {
                            "id": "3",
                            "name": {
                                "value": "Aula"
                            }
                        }
                    ]
                },
                {
                    "name": "office",
                    "values": [
                        {
                            "id": "22",
                            "name": {
                                "value": "Sekretariat International Management"
                            }
                        },
                        {
                            "id": "21",
                            "name": {
                                "value": "Sekretariat KulturMediaTechnologie"
                            }
                        },
                        {
                            "id": "19",
                            "name": {
                                "value": "Sekretariat Maschinenbau"
                            }
                        },
                        {
                            "id": "15",
                            "name": {
                                "value": "Sekretariat Wirtschaftsinformatik"
                            }
                        },
                        {
                            "id": "14",
                            "name": {
                                "value": "Sekretariat Informatik"
                            }
                        },
                        {
                            "id": "7",
                            "name": {
                                "value": "Sekretariat Elektrotechnik – Sensorik"
                            }
                        },
                        {
                            "id": "4",
                            "name": {
                                "value": "Sekretariat Baumanagement und Baubetrieb"
                            }
                        },
                        {
                            "id": "2",
                            "name": {
                                "value": "Sekretariat Bauingenieurwesen"
                            }
                        },
                        {
                            "id": "1",
                            "name": {
                                "value": "Sekretariat Architektur"
                            }
                        }
                    ]
                },
                {
                    "name": "article",
                    "values": [
                        {
                            "name": {
                                "value": "das",
                                "synonyms": [
                                    "des"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "die",
                                "synonyms": [
                                    "von der",
                                    "der"
                                ]
                            }
                        }
                    ]
                },
                {
                    "name": "times",
                    "values": [
                        {
                            "name": {
                                "value": "später"
                            }
                        },
                        {
                            "name": {
                                "value": "jetzt"
                            }
                        },
                        {
                            "name": {
                                "value": "übermorgen"
                            }
                        },
                        {
                            "name": {
                                "value": "heute"
                            }
                        },
                        {
                            "name": {
                                "value": "morgen"
                            }
                        }
                    ]
                },
                {
                    "name": "person",
                    "values": [
                        {
                            "id": "157",
                            "name": {
                                "value": "Stengel"
                            }
                        },
                        {
                            "id": "163",
                            "name": {
                                "value": "Schmidt",
                                "synonyms": [
                                    "Schmitt"
                                ]
                            }
                        },
                        {
                            "id": "5",
                            "name": {
                                "value": "Laubenheimer"
                            }
                        },
                        {
                            "id": "1",
                            "name": {
                                "value": "Ditzinger"
                            }
                        },
                        {
                            "id": "133",
                            "name": {
                                "value": "Assani",
                                "synonyms": [
                                    "Asani"
                                ]
                            }
                        },
                        {
                            "id": "173",
                            "name": {
                                "value": "Kindler",
                                "synonyms": [
                                    "Kindla"
                                ]
                            }
                        },
                        {
                            "id": "101",
                            "name": {
                                "value": "Schlegel",
                                "synonyms": [
                                    "Schlegel"
                                ]
                            }
                        },
                        {
                            "id": "162",
                            "name": {
                                "value": "Schuster"
                            }
                        },
                        {
                            "id": "54",
                            "name": {
                                "value": "Gniot"
                            }
                        },
                        {
                            "id": "46",
                            "name": {
                                "value": "Sauerwein"
                            }
                        },
                        {
                            "id": "30",
                            "name": {
                                "value": "Fischer",
                                "synonyms": [
                                    "Fischi"
                                ]
                            }
                        },
                        {
                            "id": "33",
                            "name": {
                                "value": "Magschok",
                                "synonyms": [
                                    "Gio"
                                ]
                            }
                        },
                        {
                            "id": "36",
                            "name": {
                                "value": "Thielemann",
                                "synonyms": [
                                    "Tilemann",
                                    "Tielemann"
                                ]
                            }
                        },
                        {
                            "id": "130",
                            "name": {
                                "value": "Biscosi",
                                "synonyms": [
                                    "Biskoski"
                                ]
                            }
                        },
                        {
                            "id": "47",
                            "name": {
                                "value": "Betz"
                            }
                        },
                        {
                            "id": "145",
                            "name": {
                                "value": "Krastel"
                            }
                        },
                        {
                            "id": "61",
                            "name": {
                                "value": "Meder",
                                "synonyms": [
                                    "Meda",
                                    "Meder"
                                ]
                            }
                        },
                        {
                            "id": "89",
                            "name": {
                                "value": "Thimel",
                                "synonyms": [
                                    "Timel",
                                    "Thimel"
                                ]
                            }
                        },
                        {
                            "id": "151",
                            "name": {
                                "value": "August"
                            }
                        },
                        {
                            "id": "177",
                            "name": {
                                "value": "Dziatzko",
                                "synonyms": [
                                    "Dziatzko"
                                ]
                            }
                        },
                        {
                            "id": "23",
                            "name": {
                                "value": "Holzer"
                            }
                        },
                        {
                            "id": "150",
                            "name": {
                                "value": "Altevogt"
                            }
                        },
                        {
                            "id": "20",
                            "name": {
                                "value": "Schreiner"
                            }
                        },
                        {
                            "id": "156",
                            "name": {
                                "value": "Bückel"
                            }
                        },
                        {
                            "id": "172",
                            "name": {
                                "value": "Wetzel"
                            }
                        },
                        {
                            "id": "158",
                            "name": {
                                "value": "Zeitvogel"
                            }
                        },
                        {
                            "id": "144",
                            "name": {
                                "value": "Bukhari",
                                "synonyms": [
                                    "Bukari"
                                ]
                            }
                        },
                        {
                            "id": "169",
                            "name": {
                                "value": "Cormier"
                            }
                        },
                        {
                            "id": "165",
                            "name": {
                                "value": "Hasel"
                            }
                        },
                        {
                            "id": "81",
                            "name": {
                                "value": "Hettich"
                            }
                        },
                        {
                            "id": "128",
                            "name": {
                                "value": "Iraki"
                            }
                        },
                        {
                            "id": "96",
                            "name": {
                                "value": "Mruzek-Vering",
                                "synonyms": [
                                    "Mruzek-Vering",
                                    "Mruzeck-Vering",
                                    "Mruzek",
                                    "Wering",
                                    "Vering",
                                    "Mruzeck Wering"
                                ]
                            }
                        },
                        {
                            "id": "99",
                            "name": {
                                "value": "Muessener",
                                "synonyms": [
                                    "Muessener",
                                    "Müssener",
                                    "Müsener"
                                ]
                            }
                        },
                        {
                            "id": "166",
                            "name": {
                                "value": "Baier"
                            }
                        },
                        {
                            "id": "16",
                            "name": {
                                "value": "Bröckl",
                                "synonyms": [
                                    "Bröckel"
                                ]
                            }
                        },
                        {
                            "id": "12",
                            "name": {
                                "value": "Fuchß",
                                "synonyms": [
                                    "Fuchss",
                                    "Fuchs"
                                ]
                            }
                        },
                        {
                            "id": "8",
                            "name": {
                                "value": "Haneke"
                            }
                        },
                        {
                            "id": "160",
                            "name": {
                                "value": "Hein"
                            }
                        },
                        {
                            "id": "4",
                            "name": {
                                "value": "Henning"
                            }
                        },
                        {
                            "id": "6",
                            "name": {
                                "value": "Hoffmann"
                            }
                        },
                        {
                            "id": "44",
                            "name": {
                                "value": "Hofmann"
                            }
                        },
                        {
                            "id": "14",
                            "name": {
                                "value": "Körner",
                                "synonyms": [
                                    "Koerner"
                                ]
                            }
                        },
                        {
                            "id": "161",
                            "name": {
                                "value": "Langen"
                            }
                        },
                        {
                            "id": "19",
                            "name": {
                                "value": "Link"
                            }
                        },
                        {
                            "id": "13",
                            "name": {
                                "value": "Nestler",
                                "synonyms": [
                                    "Nestla"
                                ]
                            }
                        },
                        {
                            "id": "53",
                            "name": {
                                "value": "Nochta"
                            }
                        },
                        {
                            "id": "7",
                            "name": {
                                "value": "Pape"
                            }
                        },
                        {
                            "id": "9",
                            "name": {
                                "value": "Philipp",
                                "synonyms": [
                                    "Philip"
                                ]
                            }
                        },
                        {
                            "id": "15",
                            "name": {
                                "value": "Schaefer",
                                "synonyms": [
                                    "Schäfer"
                                ]
                            }
                        },
                        {
                            "id": "116",
                            "name": {
                                "value": "Seifert"
                            }
                        },
                        {
                            "id": "21",
                            "name": {
                                "value": "Sulzmann"
                            }
                        },
                        {
                            "id": "67",
                            "name": {
                                "value": "Waldhorst"
                            }
                        },
                        {
                            "id": "118",
                            "name": {
                                "value": "Wölfel"
                            }
                        },
                        {
                            "id": "106",
                            "name": {
                                "value": "Zimmermann"
                            }
                        },
                        {
                            "id": "60",
                            "name": {
                                "value": "Zirpins"
                            }
                        },
                        {
                            "id": "3",
                            "name": {
                                "value": "Vogelsang"
                            }
                        },
                        {
                            "id": "22",
                            "name": {
                                "value": "Hinz"
                            }
                        },
                        {
                            "id": "124",
                            "name": {
                                "value": "Schwarz"
                            }
                        },
                        {
                            "id": "37",
                            "name": {
                                "value": "Stumpf"
                            }
                        },
                        {
                            "id": "84",
                            "name": {
                                "value": "Richter"
                            }
                        },
                        {
                            "id": "69",
                            "name": {
                                "value": "Steinmetz"
                            }
                        }
                    ]
                },
                {
                    "name": "anrede",
                    "values": [
                        {
                            "name": {
                                "value": "Professor Doktor"
                            }
                        },
                        {
                            "name": {
                                "value": "Doktor"
                            }
                        },
                        {
                            "name": {
                                "value": "Professor"
                            }
                        },
                        {
                            "name": {
                                "value": "Frau"
                            }
                        },
                        {
                            "name": {
                                "value": "Herr"
                            }
                        }
                    ]
                }
            ]
        },
        "dialog": {
            "intents": [
                {
                    "name": "CanteenIntent",
                    "delegationStrategy": "ALWAYS",
                    "confirmationRequired": false,
                    "prompts": {},
                    "slots": [
                        {
                            "name": "SELECTED_CANTEEN",
                            "type": "LIST_OF_CANTEENS",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.1009690337712.1434289723548"
                            },
                            "validations": [
                                {
                                    "type": "hasEntityResolutionMatch",
                                    "prompt": "Slot.Validation.444733133418.786670807227.726813912569"
                                }
                            ]
                        },
                        {
                            "name": "DATES",
                            "type": "AMAZON.DATE",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.1009690337712.520076238776"
                            }
                        }
                    ]
                },
                {
                    "name": "VegiCanteenIntent",
                    "confirmationRequired": false,
                    "prompts": {},
                    "slots": [
                        {
                            "name": "SELECTED_CANTEEN",
                            "type": "LIST_OF_CANTEENS",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.523615670135.586147693167"
                            },
                            "validations": [
                                {
                                    "type": "hasEntityResolutionMatch",
                                    "prompt": "Slot.Validation.523615670135.586147693167.1609545498861"
                                }
                            ]
                        },
                        {
                            "name": "DATES",
                            "type": "AMAZON.DATE",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.523615670135.1585718831247"
                            }
                        }
                    ]
                },
                {
                    "name": "LibraryIntent",
                    "confirmationRequired": false,
                    "prompts": {},
                    "slots": [
                        {
                            "name": "bibliothek",
                            "type": "library",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.380781042795.89797284160"
                            }
                        }
                    ]
                },
                {
                    "name": "LibraryPlaceIntent",
                    "confirmationRequired": false,
                    "prompts": {},
                    "slots": [
                        {
                            "name": "bibliothek",
                            "type": "library",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.1335876661554.729983490221"
                            }
                        }
                    ]
                },
                {
                    "name": "PersonIntent",
                    "delegationStrategy": "ALWAYS",
                    "confirmationRequired": false,
                    "prompts": {},
                    "slots": [
                        {
                            "name": "person",
                            "type": "person",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.623014281680.679386964021"
                            }
                        },
                        {
                            "name": "anrede",
                            "type": "anrede",
                            "confirmationRequired": false,
                            "elicitationRequired": false,
                            "prompts": {}
                        }
                    ]
                },
                {
                    "name": "NewsIntent",
                    "delegationStrategy": "SKILL_RESPONSE",
                    "confirmationRequired": false,
                    "prompts": {},
                    "slots": [
                        {
                            "name": "COURSE_OF_STUDIES",
                            "type": "COURSE_OF_STUDIES",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.273655157916.1215809036091"
                            }
                        },
                        {
                            "name": "NEWS_SELECTION",
                            "type": "NEWS_SELECTION",
                            "confirmationRequired": false,
                            "elicitationRequired": false,
                            "prompts": {}
                        },
                        {
                            "name": "DATES",
                            "type": "AMAZON.DATE",
                            "confirmationRequired": false,
                            "elicitationRequired": false,
                            "prompts": {}
                        }
                    ]
                },
                {
                    "name": "ScheduleTimeIntent",
                    "delegationStrategy": "ALWAYS",
                    "confirmationRequired": false,
                    "prompts": {},
                    "slots": [
                        {
                            "name": "course",
                            "type": "course",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.1085151463631.397794907043"
                            }
                        },
                        {
                            "name": "lecture",
                            "type": "lecture",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.1085151463631.1198997839593"
                            }
                        },
                        {
                            "name": "groups",
                            "type": "groups",
                            "confirmationRequired": false,
                            "elicitationRequired": false,
                            "prompts": {}
                        }
                    ]
                },
                {
                    "name": "ScheduleDateIntent",
                    "delegationStrategy": "ALWAYS",
                    "confirmationRequired": false,
                    "prompts": {},
                    "slots": [
                        {
                            "name": "course",
                            "type": "course",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.411156231524.1074383071687"
                            }
                        },
                        {
                            "name": "groups",
                            "type": "groups",
                            "confirmationRequired": false,
                            "elicitationRequired": false,
                            "prompts": {}
                        },
                        {
                            "name": "lecture",
                            "type": "lecture",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.411156231524.1269245447336"
                            }
                        },
                        {
                            "name": "date",
                            "type": "dates",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.1564616565268.211999394026"
                            }
                        }
                    ]
                },
                {
                    "name": "ScheduleRoomIntent",
                    "delegationStrategy": "ALWAYS",
                    "confirmationRequired": false,
                    "prompts": {},
                    "slots": [
                        {
                            "name": "lecture",
                            "type": "lecture",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.997313673.830583074402"
                            }
                        },
                        {
                            "name": "course",
                            "type": "course",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.997313673.77552651151"
                            }
                        },
                        {
                            "name": "groups",
                            "type": "groups",
                            "confirmationRequired": false,
                            "elicitationRequired": false,
                            "prompts": {}
                        },
                        {
                            "name": "date",
                            "type": "dates",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.997313673.463344970857"
                            }
                        }
                    ]
                },
                {
                    "name": "ScheduleLecturerIntent",
                    "delegationStrategy": "ALWAYS",
                    "confirmationRequired": false,
                    "prompts": {},
                    "slots": [
                        {
                            "name": "course",
                            "type": "course",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.1385670260473.971236081360"
                            }
                        },
                        {
                            "name": "groups",
                            "type": "groups",
                            "confirmationRequired": false,
                            "elicitationRequired": false,
                            "prompts": {}
                        },
                        {
                            "name": "lecture",
                            "type": "lecture",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.1385670260473.339874491552"
                            }
                        },
                        {
                            "name": "date",
                            "type": "dates",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.1385670260473.1149136434514"
                            }
                        }
                    ]
                },
                {
                    "name": "ScheduleNextIntent",
                    "delegationStrategy": "ALWAYS",
                    "confirmationRequired": false,
                    "prompts": {},
                    "slots": [
                        {
                            "name": "wFrage",
                            "type": "wFrage",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.64307741898.1264844048160"
                            }
                        },
                        {
                            "name": "course",
                            "type": "course",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.64307741898.760835556348"
                            }
                        },
                        {
                            "name": "semester",
                            "type": "semester",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.64307741898.260616800999"
                            }
                        },
                        {
                            "name": "groups",
                            "type": "groups",
                            "confirmationRequired": false,
                            "elicitationRequired": false,
                            "prompts": {}
                        }
                    ]
                },
                {
                    "name": "ScheduleLecturesIntent",
                    "delegationStrategy": "ALWAYS",
                    "confirmationRequired": false,
                    "prompts": {},
                    "slots": [
                        {
                            "name": "date",
                            "type": "dates",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.1030851148908.732846490651"
                            }
                        },
                        {
                            "name": "semester",
                            "type": "semester",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.1030851148908.983177174096"
                            }
                        },
                        {
                            "name": "groups",
                            "type": "groups",
                            "confirmationRequired": false,
                            "elicitationRequired": false,
                            "prompts": {}
                        },
                        {
                            "name": "course",
                            "type": "course",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.1104052540788.1170507007061"
                            }
                        }
                    ]
                }
            ],
            "delegationStrategy": "ALWAYS"
        },
        "prompts": [
            {
                "id": "Elicit.Slot.380781042795.89797284160",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Bitte nennen Sie den Namen der Bibliothek, um die freien Plätze zu erfahren."
                    }
                ]
            },
            {
                "id": "Elicit.Slot.1335876661554.729983490221",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Bitte nennen Sie den Namen der Bibliothek, um die freien Plätze zu erfahren."
                    }
                ]
            },
            {
                "id": "Elicit.Slot.1009690337712.1434289723548",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Für welche Mensa möchtest du das Menu wissen?"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.1009690337712.520076238776",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Für welchen Tag möchtest du das Menu in der Mensa wissen?"
                    }
                ]
            },
            {
                "id": "Slot.Validation.444733133418.786670807227.726813912569",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Ich konnte die Mensa {SELECTED_CANTEEN} nicht finden. Bitte wiederhole den Namen der Mensa. "
                    }
                ]
            },
            {
                "id": "Elicit.Slot.771767921670.963780000418",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Für welchen Studiengang möchtest du die Neuigkeiten wissen?"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.523615670135.586147693167",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Für welche Mensa möchtest du nach einem vegetarischen essen suchen?"
                    }
                ]
            },
            {
                "id": "Slot.Validation.523615670135.586147693167.1609545498861",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Ich habe diese Mensa leider nicht erkannt, bitte gebe mir den Namen einer Mensa in Karlsruhe an"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.523615670135.1585718831247",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Für welchen Tag möchtest du das Mensaessen einsehen?"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.623014281680.679386964021",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Bitte nenne Sie den Namen des Dozenten der Dozentin, um die Sprechstunden zu erfahren"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.273655157916.1215809036091",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Für welchen Studiengang möchtest du die Neuigkeiten wissen?"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.1085151463631.397794907043",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Für welchen Studiengang?"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.1085151463631.1198997839593",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Welche Vorlesung?"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.411156231524.1074383071687",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Für welchen Studiengang?"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.411156231524.1269245447336",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Welche Vorlesung?"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.997313673.830583074402",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Welche Vorlesung?"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.997313673.77552651151",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Für welchen Studiengang?"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.997313673.463344970857",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "An welchem Wochentag?"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.1385670260473.971236081360",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Für welchen Studiengang?"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.1385670260473.339874491552",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Welche Vorlesung?"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.1385670260473.1149136434514",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "An welchem Wochentag?"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.64307741898.1264844048160",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Mögliche Fragen sind. Wann, um wieviel Uhr, wo, oder bei wem ist die nächste Vorlesung?"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.64307741898.760835556348",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Für welchen Studiengang?"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.64307741898.260616800999",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Welches Semester?"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.1030851148908.732846490651",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "An welchem Wochentag?"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.1030851148908.983177174096",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Welches Semester?"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.1564616565268.211999394026",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Für welches Datum"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.1104052540788.1170507007061",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Für welchen Studiengang?"
                    }
                ]
            }
        ]
    }
};
