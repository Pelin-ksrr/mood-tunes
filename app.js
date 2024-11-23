import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Linking,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

const API_KEY = "69c93a796bd08bfd4d1fe646a1578b3f";
const BASE_URL = "http://ws.audioscrobbler.com/2.0/";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [mood, setMood] = useState("");

  const fetchTracks = async (tag) => {
    setLoading(true);
    setMood(tag);
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          method: "tag.gettoptracks",
          tag: tag,
          api_key: API_KEY,
          format: "json",
        },
      });
      setData(response.data.tracks.track);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        {item.artist && (
          <Text style={styles.itemSubtitle}>by {item.artist.name}</Text>
        )}
      </View>
      {item.url && (
        <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
          <FontAwesome name="play-circle" size={24} color="#FF00E1FF" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Music 🎵</Text>

      <View style={styles.moodButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => fetchTracks("happy")}
        >
          <FontAwesome name="smile-o" size={18} color="#fff" />
          <Text style={styles.buttonText}>Happy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => fetchTracks("sad")}
        >
          <FontAwesome name="frown-o" size={18} color="#fff" />
          <Text style={styles.buttonText}>Sad</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => fetchTracks("angry")}
        >
          <FontAwesome name="meh-o" size={18} color="#fff" />
          <Text style={styles.buttonText}>Angry</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => fetchTracks("excited")}
        >
          <FontAwesome name="rocket" size={18} color="#fff" />
          <Text style={styles.buttonText}>Excited</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4caf50" style={styles.loader} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  moodButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4caf50",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
  loader: {
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4caf50",
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#555",
  },
});
