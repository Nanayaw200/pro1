import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import PatientsDetailsModal from "../../components/patientDetails";
import PatientsDetailsEditModal from "../../components/patientDetailsEdit";
import { useAppContext } from "../../context/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Toast from "react-native-root-toast";
import AlertDialog from "../../components/loading";

type UserInfo = {
  id?: string;
  createAt?: Date;
  updatedAt?: Date;
  fullname?: string;
  phone?: string;
  title?: string;
  email?: string;
  gender?: string;
  dob?: Date | string;
  avatar: string | null;
};

const DocProfile = () => {
  let {
    apiurl,
    userData,
    alertMSG,
    setAlertMSG,
    alertColor,
    setAlertColor,
    toastVisible,
    setToastVisible,
  }: any = useAppContext();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [data, setData] = useState<UserInfo | any>(userData.current.doctorinfo);
  const [image, setImage] = useState<string | Blob>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userData.current.role === "doctor") {
      if (userData.current.doctorinfo) {
        setShowDetails(true);
        setData(userData.current.doctorinfo);
      } else {
        setShowDetails(false);
      }
    }
    if (userData.current.role === "patient") {
      if (userData.current.patientinfo) {
        setShowDetails(true);
        setData(userData.current.patientinfo);
      } else {
        setShowDetails(false);
      }
    }
  }, [userData.current]);

  const formateDate = (date: Date): string => {
    const month = (date?.getMonth() + 1).toString().padStart(2, "0");
    const day = date?.getDate().toString().padStart(2, "0");
    const year = date?.getFullYear();
    return `${month}/${day}/${year}`;
  };
 
  const closeModal = () => {
    setShowModal(false);
  };
 
  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const getinitials = (name: string) => {
    let sentence = name;

    // Split the sentence into words
    let words = sentence.split(" ");

    // Get the first character of each word
    let firstChars = words.map((word) => word[0]);

    let initials = firstChars.join("");
    return initials;
  };

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        setAlertMSG("Sorry, permission to access photos is denied");
        setAlertColor("#FF6B6B");
        setToastVisible(true);
        setLoading(false);
        return;
      }

      let result: any = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: false,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        updateAvater(result.assets[0].uri);
      } else {
        setAlertMSG("No image selected");
        setAlertColor("#000");
        setToastVisible(true);
      }
    } catch (error) {
      setAlertMSG(error);
      setAlertColor("#FF6B6B");
      setToastVisible(true);
      setLoading(false);
    }
  };

  const updateAvater = (uri: string | Blob) => {
    let formData: any = new FormData();

    formData.append("file", {
      uri,
      type: "image/jpeg",
      name: "photo.jpg",
    });
    formData.append("upload_preset", "tehcpreset");

    setLoading(true);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/dtyhnoutq/image/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          axios
            .patch(`${apiurl}/doctor/update/avater/${data.id}`, {
              avatar: res.data.secure_url,
              userid: userData.current.id,
            })
            .then(async (res) => {
              if (!res.data.success) {
                setAlertMSG(res.data.message);
                setAlertColor("#FFC107");
                setToastVisible(true);
                setLoading(false);
              } else {
                userData.current = res.data.user;
                await AsyncStorage.setItem(
                  "user",
                  JSON.stringify(res.data.user)
                );
                setAlertMSG(res.data.message);
                setAlertColor("#59ac60");
                setToastVisible(true);
                setLoading(false);
              }
            })
            .catch((err) => {
              setAlertMSG(`Error ${err}`);
              setAlertColor("#FF6B6B");
              setToastVisible(true);
              setLoading(false);
            });
        }
      })
      .catch((eror) => {
        console.log("Error from cloudinary: ", eror);
        setAlertMSG(`Error ${eror}`);
        setAlertColor("#FF6B6B");
        setToastVisible(true);
        setLoading(false);
      });
  };

  const closealert = () => {
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };
  useEffect(() => {
    closealert();
  }, [toastVisible]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>My Profile</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 10,
          alignItems: "center",
          justifyContent: "center",
          // gap: 10,
        }}
        scrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerCard}>
          {data ? (
            data.avatar ? (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={pickImage}
                style={styles.patientImg}
              >
                <Image
                  resizeMode="cover"
                  source={{
                    uri: data.avatar,
                  }}
                  style={styles.patientImg}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.patientImg}
                onPress={pickImage}
              >
                <Text style={styles.patientImgtxt}>
                  {getinitials(data?.fullname)}
                </Text>
              </TouchableOpacity>
            )
          ) : (
            <View style={styles.patientImg}></View>
          )}

          {/* <Image style={styles.patientImg} /> */}
          <View style={styles.detailsCard}>
            <View style={styles.editContainer}>
              {data && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => router.push("/editdocinfo")}
                >
                  <AntDesign name="edit" color="#fff" size={24} />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.patientInfoCard}>
              <Text style={styles.nameTxt}>
                {data ? data.fullname : "Not set"}
              </Text>
              <View style={styles.phoneContainer}>
                <MaterialIcons name="phone" color="#fff" size={20} />
                <Text style={styles.phoneTxt}>
                  {data ? data.phone : "0000-000-000"}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.personalInfoContainer}>
          <Text style={styles.personalInfoTxt}>Personal Info</Text>

          {!showDetails ? (
            <View style={styles.noinfo}>
              <Text style={styles.noinfotxt}>
                Please add your personal infomation
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push("/adddocinfo")}
              >
                <Text style={styles.noinfobtntxt}>Add info</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.info}>
              <View style={styles.personalInfoTxtContianer}>
                <Text style={styles.personalInfoTxt}>Title:</Text>
                <Text style={styles.detailTxt}>
                  {data ? data.title : "Not set"}
                </Text>
              </View>
              <View style={styles.personalInfoTxtContianer}>
                <Text style={styles.personalInfoTxt}>Email:</Text>
                <Text style={styles.detailTxt}>
                  {data ? data.email : "Not set"}
                </Text>
              </View>
              <View style={styles.personalInfoTxtContianer}>
                <Text style={styles.personalInfoTxt}>Date of birth:</Text>

                <Text style={styles.detailTxt}>
                  {data ? formateDate(date) : "Not set"}
                </Text>
              </View>

              <View style={styles.personalInfoTxtContianer}>
                <Text style={styles.personalInfoTxt}>Gender:</Text>
                <Text style={styles.detailTxt}>
                  {data ? data.gender : "Not set"}
                </Text>
              </View>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={{ marginTop: 50 }}
          activeOpacity={0.6}
          onPress={() => router.push("/alert")}
        >
          <Text style={styles.noinfobtntxt}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
      <PatientsDetailsModal
        modalVisible={showModal}
        onRequestClose={closeModal}
      />
      <PatientsDetailsEditModal
        modalVisible={showEditModal}
        onRequestClose={closeEditModal}
      />
      <Toast
        visible={toastVisible}
        position={40}
        backgroundColor="transparent"
        shadow={false}
        animation={true}
        onPress={() => setToastVisible(false)}
        style={{ zIndex: 2 }}
        // hideOnPress={true}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: alertColor,
            padding: 15,
            borderRadius: 50,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 14, fontWeight: "700" }}>
            {alertMSG}
          </Text>
        </View>
      </Toast>
      <AlertDialog
        modalVisible={loading}
        onRequestClose={() => setLoading(false)}
      />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default DocProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 5,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
  },
  headerTxt: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1e1e1e",
  },
  headerCard: {
    width: "100%",
    height: 207,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  detailsCard: {
    position: "relative",
    width: "100%",
    height: 170,
    // paddingVertical: 10,
    backgroundColor: "#3497F9",
    borderRadius: 40,
  },
  patientImg: {
    position: "absolute",
    top: 0,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -50,
    borderRadius: 20,
    backgroundColor: "#ccc",
    zIndex: 1,
  },
  patientImgtxt: {
    fontSize: 30,
    fontWeight: "500",
    color: "#1e1e1e",
  },

  editContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "flex-end",
  },
  patientInfoCard: {
    flex: 1,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  nameTxt: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  phoneTxt: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  personalInfoContainer: {
    width: "100%",
    marginTop: 30,
    paddingHorizontal: 10,
  },
  info: {
    width: "100%",
    marginTop: 8,
  },
  noinfo: {
    width: "100%",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  noinfotxt: {
    fontSize: 18,
    fontWeight: "400",
    color: "#707070",
  },
  noinfobtntxt: {
    color: "#3497F9",
    fontSize: 18,
    fontWeight: "600",
  },
  personalInfoTxt: {
    fontSize: 18,
    fontWeight: "500",
    color: "#808080",
  },
  detailTxt: {
    fontSize: 16,
    fontWeight: "500",
    color: "#242222",
  },
  personalInfoTxtContianer: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
