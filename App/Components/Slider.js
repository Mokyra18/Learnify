import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Dimensions } from 'react-native';
import GlobalApi from '../Shared/GlobalApi';

export default function Slider() {
  const [slider, setSlider] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSlider();
  }, []);

  const getSlider = async () => {
    try {
      const result = await GlobalApi.getSlider();
      const responseData = result.data;

      if (!responseData || responseData.error) {
        setError('Failed to fetch slider data. Please try again.');
        return;
      }

      const resp = responseData.data.map((item) => ({
        id: item.id,
        name: item.attributes.name,
        image: item.attributes.image.data.attributes.url,
      }));

      setSlider(resp);
    } catch (error) {
      console.error('Error fetching slider data:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <View style={{ marginTop: 10 }}>
      {error && (
        <View>
          <Text style={{ color: 'red' }}>{error}</Text>
        </View>
      )}
      <FlatList
        data={slider}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item.image }}
              style={{
                width: Dimensions.get('screen').width * 0.87,
                height: 150,
                borderRadius: 10,
                marginRight: 15,
              }}
            />
          </View>
        )}
      />
    </View>
  );
}
