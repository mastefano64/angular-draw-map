
export class TestData {

  static createTest1(): string {
    const str = `
    {
      "summary": {
        "name": "s1",
        "description": "s2"
      },
      "points": [
        {
          "id": "da1b616c-0a81-4f13-7e80-04736ad546e8",
          "lonlat": [
            {
              "lon": 7.415256508626042,
              "lat": 45.064791589787205
            }
          ],
          "name": "pt1",
          "description": "pt2"
        }
      ],
      "linestrings": [
        {
          "id": "0fc9bbe5-751e-a6a9-b2c8-ab755f495db4",
          "lonlat": [
            {
              "lon": 7.381748195271938,
              "lat": 45.04325431425792
            },
            {
              "lon": 7.414707179646938,
              "lat": 45.055285142808884
            },
            {
              "lon": 7.447940838988869,
              "lat": 45.04597117678267
            },
            {
              "lon": 7.4836464053951195,
              "lat": 45.041701774031054
            }
          ],
          "name": "li1",
          "description": "li2"
        }
      ],
      "polygons": [
        {
          "id": "7ef97019-1a68-5e1e-d444-2fb719d32ee4",
          "lonlat": [
            {
              "lon": 7.392734523396939,
              "lat": 45.027532811172534
            },
            {
              "lon": 7.43695451086387,
              "lat": 45.0376261203138
            },
            {
              "lon": 7.428989418782292,
              "lat": 45.01122446205349
            },
            {
              "lon": 7.392734523396939,
              "lat": 45.027532811172534
            }
          ],
          "name": "po1",
          "description": "po2"
        }
      ]
    }
    `
    return str;
  }

  static createTest2(): string {
    const str = `
    {
      "summary": {
        "name": "s3",
        "description": "s4"
      },
      "points": [
        {
          "id": "d530e8f2-978a-1748-be96-40eb14ef7430",
          "lonlat": [
            {
              "lon": 7.6568055152893075,
              "lat": 45.07260381965381
            }
          ],
          "name": "pt1",
          "description": "pt2"
        },
        {
          "id": "ad8d09fa-5412-e868-c232-1c01ee70be64",
          "lonlat": [
            {
              "lon": 7.65824317932129,
              "lat": 45.072118901545366
            }
          ],
          "name": "pt3",
          "description": "pt4"
        },
        {
          "id": "49fb1965-d22e-cf9d-e75b-32ea28b7bff0",
          "lonlat": [
            {
              "lon": 7.659595012664796,
              "lat": 45.07167944095565
            }
          ],
          "name": "pt5",
          "description": "pt6"
        },
        {
          "id": "3e88c305-0265-5b9c-c813-9cff70a86f60",
          "lonlat": [
            {
              "lon": 7.660839557647705,
              "lat": 45.07123997698679
            }
          ],
          "name": "pt7",
          "description": "pt8"
        },
        {
          "id": "cf99fdcb-aa27-dc08-6cd8-476b319adbb5",
          "lonlat": [
            {
              "lon": 7.6616334915161115,
              "lat": 45.070982358606415
            }
          ],
          "name": "pt9",
          "description": "pt10"
        }
      ],
      "linestrings": [
        {
          "id": "506eb1be-2789-b613-2739-017a49dc72e4",
          "lonlat": [
            {
              "lon": 7.656226158142091,
              "lat": 45.07387671011273
            },
            {
              "lon": 7.657470703125001,
              "lat": 45.07343726303961
            },
            {
              "lon": 7.658865451812744,
              "lat": 45.07293719846669
            },
            {
              "lon": 7.6601529121398935,
              "lat": 45.07246743685167
            },
            {
              "lon": 7.661418914794924,
              "lat": 45.072027978941975
            },
            {
              "lon": 7.662920951843263,
              "lat": 45.071497594205965
            },
            {
              "lon": 7.664165496826173,
              "lat": 45.07105812883884
            }
          ],
          "name": "li1",
          "description": "li2"
        },
        {
          "id": "db7272b1-48c0-ee64-796f-4ea9d39a7f2c",
          "lonlat": [
            {
              "lon": 7.658801078796388,
              "lat": 45.07407370253134
            },
            {
              "lon": 7.66021728515625,
              "lat": 45.07357364352737
            },
            {
              "lon": 7.661397457122804,
              "lat": 45.073149347607796
            },
            {
              "lon": 7.6627707481384295,
              "lat": 45.072664434128086
            },
            {
              "lon": 7.663908004760744,
              "lat": 45.072270438896254
            },
            {
              "lon": 7.664787769317627,
              "lat": 45.071952209995345
            }
          ],
          "name": "li3",
          "description": "li4"
        }
      ],
      "polygons": [
        {
          "id": "2a56ff9c-65c6-be31-68a7-997f12b622c7",
          "lonlat": [
            {
              "lon": 7.659230232238769,
              "lat": 45.07502834847938
            },
            {
              "lon": 7.665538787841795,
              "lat": 45.072800816460074
            },
            {
              "lon": 7.6665258407592765,
              "lat": 45.074285847453524
            },
            {
              "lon": 7.663736343383788,
              "lat": 45.07521018399473
            },
            {
              "lon": 7.661290168762205,
              "lat": 45.07514957222057
            },
            {
              "lon": 7.659230232238769,
              "lat": 45.07502834847938
            }
          ],
          "name": "pp1",
          "description": "pp1"
        }
      ]
    }
    `
    return str;
  }

  static createTest3(): string {
    const str = `
    {
      "summary": {
        "name": "s3",
        "description": "s4"
      },
      "points": [
        {
          "id": "d530e8f2-978a-1748-be96-40eb14ef7430",
          "lonlat": [
            {
              "lon": 7.657148838043213,
              "lat": 45.07298265906323
            }
          ],
          "name": "pt1",
          "description": "pt2"
        },
        {
          "id": "ad8d09fa-5412-e868-c232-1c01ee70be64",
          "lonlat": [
            {
              "lon": 7.658522129058836,
              "lat": 45.072482590512436
            }
          ],
          "name": "pt3",
          "description": "pt4"
        },
        {
          "id": "49fb1965-d22e-cf9d-e75b-32ea28b7bff0",
          "lonlat": [
            {
              "lon": 7.6598310470581055,
              "lat": 45.072027978941975
            }
          ],
          "name": "pt5",
          "description": "pt6"
        },
        {
          "id": "3e88c305-0265-5b9c-c813-9cff70a86f60",
          "lonlat": [
            {
              "lon": 7.661097049713133,
              "lat": 45.07154305594764
            }
          ],
          "name": "pt7",
          "description": "pt8"
        },
        {
          "id": "cf99fdcb-aa27-dc08-6cd8-476b319adbb5",
          "lonlat": [
            {
              "lon": 7.661912441253661,
              "lat": 45.071300592907534
            }
          ],
          "name": "pt9",
          "description": "pt10"
        }
      ],
      "linestrings": [
        {
          "id": "506eb1be-2789-b613-2739-017a49dc72e4",
          "lonlat": [
            {
              "lon": 7.656226158142091,
              "lat": 45.07387671011273
            },
            {
              "lon": 7.657814025878906,
              "lat": 45.07402824280271
            },
            {
              "lon": 7.658865451812744,
              "lat": 45.07293719846669
            },
            {
              "lon": 7.660560607910155,
              "lat": 45.07302811962359
            },
            {
              "lon": 7.661418914794924,
              "lat": 45.072027978941975
            },
            {
              "lon": 7.663307189941406,
              "lat": 45.07207344026176
            },
            {
              "lon": 7.664165496826173,
              "lat": 45.07105812883884
            }
          ],
          "name": "li1",
          "description": "li2"
        },
        {
          "id": "db7272b1-48c0-ee64-796f-4ea9d39a7f2c",
          "lonlat": [
            {
              "lon": 7.658565044403075,
              "lat": 45.07405854929249
            },
            {
              "lon": 7.659187316894531,
              "lat": 45.07345241644322
            },
            {
              "lon": 7.66021728515625,
              "lat": 45.07357364352737
            },
            {
              "lon": 7.661397457122804,
              "lat": 45.073149347607796
            },
            {
              "lon": 7.661783695220947,
              "lat": 45.07245228318692
            },
            {
              "lon": 7.6627707481384295,
              "lat": 45.072664434128086
            },
            {
              "lon": 7.663908004760744,
              "lat": 45.072270438896254
            },
            {
              "lon": 7.6645731925964355,
              "lat": 45.071512748123865
            }
          ],
          "name": "li3",
          "description": "li4"
        }
      ],
      "polygons": [
        {
          "id": "2a56ff9c-65c6-be31-68a7-997f12b622c7",
          "lonlat": [
            {
              "lon": 7.659230232238769,
              "lat": 45.07502834847938
            },
            {
              "lon": 7.663736343383788,
              "lat": 45.07413431544663
            },
            {
              "lon": 7.662577629089338,
              "lat": 45.07384640352649
            },
            {
              "lon": 7.665538787841795,
              "lat": 45.072800816460074
            },
            {
              "lon": 7.6665258407592765,
              "lat": 45.074285847453524
            },
            {
              "lon": 7.664659023284912,
              "lat": 45.07424038789364
            },
            {
              "lon": 7.663736343383788,
              "lat": 45.075210183994756
            },
            {
              "lon": 7.6619553565979,
              "lat": 45.075179878115705
            },
            {
              "lon": 7.661290168762205,
              "lat": 45.07514957222057
            },
            {
              "lon": 7.659230232238769,
              "lat": 45.07502834847938
            }
          ],
          "name": "pp1",
          "description": "pp1"
        }
      ]
    }

    `
    return str;
  }


}
