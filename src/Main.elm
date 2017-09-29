port module Main exposing (..)

import Html exposing (Html, text, div, h1, textarea, ul, li, button)
import Html.Attributes exposing (class, value)
import Html.Events exposing (onClick)


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
    = RequestBluetoothConnection
    | BluetoothConnectionResponse String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        RequestBluetoothConnection ->
            ( model, requestBluetoothConnection () )

        BluetoothConnectionResponse response ->
            ( model, Cmd.none )



---- VIEW ----


view : Model -> Html Msg
view model =
    div [ class "container" ]
        [ h1 [ class "text-center" ] [ text "Elm Web Bluetooth Scanning App!" ]
        , button [ onClick RequestBluetoothConnection ] [ text "Connect to Bluetooth" ]
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
        , subscriptions = subscriptions
        }



---- SUBSCRIPTIONS ----


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ bluetoothConnectionResponse BluetoothConnectionResponse ]



---- PORTS ----


port requestBluetoothConnection : () -> Cmd msg


port bluetoothConnectionResponse : (String -> msg) -> Sub msg
