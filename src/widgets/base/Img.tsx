/**
 * @author shaorencen@yodinfo.com
 * @flow
 * @description 图片图标组件
 */
import React, { Component } from 'react';
import { Image } from 'react-native';

type ImgProps = {
  src?: string;
  style?: any;
  defaultSource?: any;
  width?: number;
  height?: number;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  cache?: 'default' | 'reload' | 'force-cache' | 'only-if-cached';
  round?: boolean;
};
export class Img extends Component<ImgProps, any> {
  constructor(props: ImgProps) {
    super(props);
  }
  render() {
    const {
      src,
      width,
      height,
      style = {},
      round,
      defaultSource,
      resizeMode = 'stretch',
      cache = 'default'
    } = this.props;
    let source = typeof src === 'string' ? { uri: src, cache: cache } : src;
    let h = height || width;
    return (
      <Image
        defaultSource={defaultSource}
        resizeMode={resizeMode}
        style={[
          { width: width, height: h, borderRadius: round ? width / 2 : 0 },
          style
        ]}
        source={source}
      >
        {this.props.children}
      </Image>
    );
  }
}
