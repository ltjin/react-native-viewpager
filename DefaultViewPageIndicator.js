'use strict';
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';

const deviceWidth = Dimensions.get('window').width;
const DOT_SIZE = 6;
const DOT_SAPCE = 4;
const DOT_OFFSET = 2;

const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
  },

  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dot: {
    width: DOT_SIZE * DOT_OFFSET,
    height: DOT_SIZE,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginLeft: DOT_SAPCE,
    marginRight: DOT_SAPCE,
    transform: [
      { skewX: '-60deg' }
    ]
  },

  curDot: {
    position: 'absolute',
    width: DOT_SIZE * DOT_OFFSET,
    height: DOT_SIZE,
    backgroundColor: 'rgba(255,291,24, 0.3)',
    margin: DOT_SAPCE,
    bottom: 0,
    transform: [
      { skewX: '-60deg' }
    ]
  },
});
export default class DefaultViewPageIndicator extends Component {
  static propTypes = {
    goToPage: PropTypes.func,
    activePage: PropTypes.number,
    pageCount: PropTypes.number
  }

  constructor(props){
    super(props);
    this.state = {
      viewWidth: 0
    }
  }

  renderIndicator(page) {
    //var isTabActive = this.props.activePage === page;
    return (
      <TouchableOpacity style={styles.tab} key={'idc_' + page} onPress={() => this.props.goToPage(page)}>
        <View style={styles.dot} />
      </TouchableOpacity>
    );
  }

  render() {
    const { pageCount } = this.props;
    const itemWidth = DOT_SIZE * DOT_OFFSET + (DOT_SAPCE * 2);

    //var left = offset;
    const offsetX = itemWidth * (this.props.activePage - this.props.scrollOffset);
    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [offsetX, offsetX + itemWidth]
    })

    let indicators = [];
    for (var i = 0; i < pageCount; i++) {
      indicators.push(this.renderIndicator(i))
    }

    return (
      <View style={styles.tabs}
        onLayout={(event) => {
          var viewWidth = event.nativeEvent.layout.width;
          if (!viewWidth || this.state.viewWidth === viewWidth) {
            return;
          }
          this.setState({
            viewWidth: viewWidth,
          });
        }}>
        {indicators}
        <Animated.View style={[styles.curDot, { left }]} />
      </View>
    );
  }
}
