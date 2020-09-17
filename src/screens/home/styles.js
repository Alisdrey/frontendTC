import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const ScrollView = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  keyboardShouldPersistTaps: 'always',
  contentContainerStyle: {
    padding: 10,
  },
})``;

export const Cover = styled.Image.attrs({
  resizeMode: 'cover',
  borderRadius: 10,
})`
  height: 120px;
  width: 80px;
`;

export const Title = styled.Text`
  font-size: 11px;
  text-align: center;
`;

export const Post = styled.View`
  margin-top: 10px;
`;

export const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin-right: 10px;
`;

export const Name = styled.Text`
  font-weight: 600;
`;

export const Description = styled.Text`
  padding: 15px;
  line-height: 18px;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#999'
})`
  margin: 30px 0;
`;