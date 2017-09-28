module Main exposing (..)

import Html exposing (Html, text, div, h1, textarea, ul, li)
import Html.Attributes exposing (class)


---- MODEL ----


type alias Model =
    { scanInput : String
    , scans : List String
    }


init : ( Model, Cmd Msg )
init =
    ( { scanInput = ""
      , scans = []
      }
    , Cmd.none
    )



---- UPDATE ----


type Msg
    = NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )



---- VIEW ----


view : Model -> Html Msg
view model =
    div [ class "container" ]
        [ h1 [ class "text-center" ] [ text "Elm Web Bluetooth Scanning App!" ]
        , textarea [] []
        , ul []
            [ listItems ]
        ]


listItems : Html Msg
listItems =
    li [] [ text "some text" ]



---- PROGRAM ----


main : Program Never Model Msg
main =
    Html.program
        { view = view
        , init = init
        , update = update
        , subscriptions = \_ -> Sub.none
        }
