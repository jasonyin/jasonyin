'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCorrectEventName = getCorrectEventName;
exports.getCorrectPropertyName = getCorrectPropertyName;
//    Copyright 2017 Jason Yin <jasonyin@outlook.com>
// 
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
// 
//        http://www.apache.org/licenses/LICENSE-2.0
// 
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

var eventTypeMap = {
  animationstart: {
    noPrefix: 'animationstart',
    webkitPrefix: 'webkitAnimationStart'
  },
  animationend: {
    noPrefix: 'animationend',
    webkitPrefix: 'webkitAnimationEnd'
  },
  animationiteration: {
    noPrefix: 'animationiteration',
    webkitPrefix: 'webkitAnimationIteration'
  },
  transitionend: {
    noPrefix: 'transitionend',
    webkitPrefix: 'webkitTransitionEnd'
  }
};

var cssPropertyMap = {
  animation: {
    noPrefix: 'animation',
    webkitPrefix: '-webkit-animation'
  },
  transform: {
    noPrefix: 'transform',
    webkitPrefix: '-webkit-transform'
  },
  transition: {
    noPrefix: 'transition',
    webkitPrefix: '-webkit-transition'
  }
};

function hasProperShape(windowObj) {
  return windowObj.document !== undefined && typeof windowObj.document.createElement === 'function';
}

function eventFoundInMaps(eventType) {
  return eventType in eventTypeMap || eventType in cssPropertyMap;
}

// If 'animation' or 'transition' exist as style property, webkit prefix isn't necessary. Since we are unable to
// see the event types on the element, we must rely on the corresponding style properties.
function getJavaScriptEventName(eventType, map, el) {
  switch (eventType) {
    case 'animationstart':
    case 'animationend':
    case 'animationiteration':
      return 'animation' in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
    case 'transitionend':
      return 'transition' in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
    default:
      return map[eventType].noPrefix;
  }
}

// Helper function to determine browser prefix for CSS3 animation events
// and property names
//
// Parameters:
// windowObject: Object -- Contains Document with a `createElement()` method
// eventType: string -- The type of animation
//
// returns the value of the event as a string, prefixed if necessary.
// If proper arguments are not supplied, this function will return
// the property or event type without webkit prefix.
//
function getAnimationName(windowObj, eventType) {
  if (!hasProperShape(windowObj) || !eventFoundInMaps(eventType)) {
    return eventType;
  }

  var map = eventType in eventTypeMap ? eventTypeMap : cssPropertyMap;
  var el = windowObj.document.createElement('div');
  var eventName = '';

  if (map === eventTypeMap) {
    eventName = getJavaScriptEventName(eventType, map, el);
  } else {
    eventName = map[eventType].noPrefix in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
  }

  return eventName;
}

// Public functions to access getAnimationName() for JavaScript events or CSS
// property names.
//
// Parameters:
// windowObject: Object -- Contains Document with a `createElement()` method
// eventType: string -- The type of animation
//
// returns the value of the event as a string, prefixed if necessary.
// If proper arguments are not supplied, this function will return
// the property or event type without webkit prefix.
//
function getCorrectEventName(windowObj, eventType) {
  return getAnimationName(windowObj, eventType);
}

function getCorrectPropertyName(windowObj, eventType) {
  return getAnimationName(windowObj, eventType);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuaW1hdGlvbi9pbmRleC5qcyJdLCJuYW1lcyI6WyJnZXRDb3JyZWN0RXZlbnROYW1lIiwiZ2V0Q29ycmVjdFByb3BlcnR5TmFtZSIsImV2ZW50VHlwZU1hcCIsImFuaW1hdGlvbnN0YXJ0Iiwibm9QcmVmaXgiLCJ3ZWJraXRQcmVmaXgiLCJhbmltYXRpb25lbmQiLCJhbmltYXRpb25pdGVyYXRpb24iLCJ0cmFuc2l0aW9uZW5kIiwiY3NzUHJvcGVydHlNYXAiLCJhbmltYXRpb24iLCJ0cmFuc2Zvcm0iLCJ0cmFuc2l0aW9uIiwiaGFzUHJvcGVyU2hhcGUiLCJ3aW5kb3dPYmoiLCJkb2N1bWVudCIsInVuZGVmaW5lZCIsImNyZWF0ZUVsZW1lbnQiLCJldmVudEZvdW5kSW5NYXBzIiwiZXZlbnRUeXBlIiwiZ2V0SmF2YVNjcmlwdEV2ZW50TmFtZSIsIm1hcCIsImVsIiwic3R5bGUiLCJnZXRBbmltYXRpb25OYW1lIiwiZXZlbnROYW1lIl0sIm1hcHBpbmdzIjoiOzs7OztRQStHZ0JBLG1CLEdBQUFBLG1CO1FBSUFDLHNCLEdBQUFBLHNCO0FBbkhoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNQyxlQUFlO0FBQ25CQyxrQkFBZ0I7QUFDZEMsY0FBVSxnQkFESTtBQUVkQyxrQkFBYztBQUZBLEdBREc7QUFLbkJDLGdCQUFjO0FBQ1pGLGNBQVUsY0FERTtBQUVaQyxrQkFBYztBQUZGLEdBTEs7QUFTbkJFLHNCQUFvQjtBQUNsQkgsY0FBVSxvQkFEUTtBQUVsQkMsa0JBQWM7QUFGSSxHQVREO0FBYW5CRyxpQkFBZTtBQUNiSixjQUFVLGVBREc7QUFFYkMsa0JBQWM7QUFGRDtBQWJJLENBQXJCOztBQW1CQSxJQUFNSSxpQkFBaUI7QUFDckJDLGFBQVc7QUFDVE4sY0FBVSxXQUREO0FBRVRDLGtCQUFjO0FBRkwsR0FEVTtBQUtyQk0sYUFBVztBQUNUUCxjQUFVLFdBREQ7QUFFVEMsa0JBQWM7QUFGTCxHQUxVO0FBU3JCTyxjQUFZO0FBQ1ZSLGNBQVUsWUFEQTtBQUVWQyxrQkFBYztBQUZKO0FBVFMsQ0FBdkI7O0FBZUEsU0FBU1EsY0FBVCxDQUF3QkMsU0FBeEIsRUFBbUM7QUFDakMsU0FBUUEsVUFBVUMsUUFBVixLQUF1QkMsU0FBdkIsSUFBb0MsT0FBT0YsVUFBVUMsUUFBVixDQUFtQkUsYUFBMUIsS0FBNEMsVUFBeEY7QUFDRDs7QUFFRCxTQUFTQyxnQkFBVCxDQUEwQkMsU0FBMUIsRUFBcUM7QUFDbkMsU0FBUUEsYUFBYWpCLFlBQWIsSUFBNkJpQixhQUFhVixjQUFsRDtBQUNEOztBQUVEO0FBQ0E7QUFDQSxTQUFTVyxzQkFBVCxDQUFnQ0QsU0FBaEMsRUFBMkNFLEdBQTNDLEVBQWdEQyxFQUFoRCxFQUFvRDtBQUNsRCxVQUFRSCxTQUFSO0FBQ0UsU0FBSyxnQkFBTDtBQUNBLFNBQUssY0FBTDtBQUNBLFNBQUssb0JBQUw7QUFDRSxhQUFPLGVBQWVHLEdBQUdDLEtBQWxCLEdBQTBCRixJQUFJRixTQUFKLEVBQWVmLFFBQXpDLEdBQW9EaUIsSUFBSUYsU0FBSixFQUFlZCxZQUExRTtBQUNGLFNBQUssZUFBTDtBQUNFLGFBQU8sZ0JBQWdCaUIsR0FBR0MsS0FBbkIsR0FBMkJGLElBQUlGLFNBQUosRUFBZWYsUUFBMUMsR0FBcURpQixJQUFJRixTQUFKLEVBQWVkLFlBQTNFO0FBQ0Y7QUFDRSxhQUFPZ0IsSUFBSUYsU0FBSixFQUFlZixRQUF0QjtBQVJKO0FBVUQ7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVNvQixnQkFBVCxDQUEwQlYsU0FBMUIsRUFBcUNLLFNBQXJDLEVBQWdEO0FBQzlDLE1BQUksQ0FBQ04sZUFBZUMsU0FBZixDQUFELElBQThCLENBQUNJLGlCQUFpQkMsU0FBakIsQ0FBbkMsRUFBZ0U7QUFDOUQsV0FBT0EsU0FBUDtBQUNEOztBQUVELE1BQU1FLE1BQU1GLGFBQWFqQixZQUFiLEdBQTRCQSxZQUE1QixHQUEyQ08sY0FBdkQ7QUFDQSxNQUFNYSxLQUFLUixVQUFVQyxRQUFWLENBQW1CRSxhQUFuQixDQUFpQyxLQUFqQyxDQUFYO0FBQ0EsTUFBSVEsWUFBWSxFQUFoQjs7QUFFQSxNQUFJSixRQUFRbkIsWUFBWixFQUEwQjtBQUN4QnVCLGdCQUFZTCx1QkFBdUJELFNBQXZCLEVBQWtDRSxHQUFsQyxFQUF1Q0MsRUFBdkMsQ0FBWjtBQUNELEdBRkQsTUFFTztBQUNMRyxnQkFBWUosSUFBSUYsU0FBSixFQUFlZixRQUFmLElBQTJCa0IsR0FBR0MsS0FBOUIsR0FBc0NGLElBQUlGLFNBQUosRUFBZWYsUUFBckQsR0FBZ0VpQixJQUFJRixTQUFKLEVBQWVkLFlBQTNGO0FBQ0Q7O0FBRUQsU0FBT29CLFNBQVA7QUFDRDs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sU0FBU3pCLG1CQUFULENBQTZCYyxTQUE3QixFQUF3Q0ssU0FBeEMsRUFBbUQ7QUFDeEQsU0FBT0ssaUJBQWlCVixTQUFqQixFQUE0QkssU0FBNUIsQ0FBUDtBQUNEOztBQUVNLFNBQVNsQixzQkFBVCxDQUFnQ2EsU0FBaEMsRUFBMkNLLFNBQTNDLEVBQXNEO0FBQzNELFNBQU9LLGlCQUFpQlYsU0FBakIsRUFBNEJLLFNBQTVCLENBQVA7QUFDRCIsImZpbGUiOiJhbmltYXRpb24vaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgICBDb3B5cmlnaHQgMjAxNyBKYXNvbiBZaW4gPGphc29ueWluQG91dGxvb2suY29tPlxuLy8gXG4vLyAgICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8gICAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gICAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vLyBcbi8vICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vIFxuLy8gICAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gICAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gICAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyAgICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyAgICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuY29uc3QgZXZlbnRUeXBlTWFwID0ge1xuICBhbmltYXRpb25zdGFydDoge1xuICAgIG5vUHJlZml4OiAnYW5pbWF0aW9uc3RhcnQnLFxuICAgIHdlYmtpdFByZWZpeDogJ3dlYmtpdEFuaW1hdGlvblN0YXJ0JyxcbiAgfSxcbiAgYW5pbWF0aW9uZW5kOiB7XG4gICAgbm9QcmVmaXg6ICdhbmltYXRpb25lbmQnLFxuICAgIHdlYmtpdFByZWZpeDogJ3dlYmtpdEFuaW1hdGlvbkVuZCcsXG4gIH0sXG4gIGFuaW1hdGlvbml0ZXJhdGlvbjoge1xuICAgIG5vUHJlZml4OiAnYW5pbWF0aW9uaXRlcmF0aW9uJyxcbiAgICB3ZWJraXRQcmVmaXg6ICd3ZWJraXRBbmltYXRpb25JdGVyYXRpb24nLFxuICB9LFxuICB0cmFuc2l0aW9uZW5kOiB7XG4gICAgbm9QcmVmaXg6ICd0cmFuc2l0aW9uZW5kJyxcbiAgICB3ZWJraXRQcmVmaXg6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgfSxcbn07XG5cbmNvbnN0IGNzc1Byb3BlcnR5TWFwID0ge1xuICBhbmltYXRpb246IHtcbiAgICBub1ByZWZpeDogJ2FuaW1hdGlvbicsXG4gICAgd2Via2l0UHJlZml4OiAnLXdlYmtpdC1hbmltYXRpb24nLFxuICB9LFxuICB0cmFuc2Zvcm06IHtcbiAgICBub1ByZWZpeDogJ3RyYW5zZm9ybScsXG4gICAgd2Via2l0UHJlZml4OiAnLXdlYmtpdC10cmFuc2Zvcm0nLFxuICB9LFxuICB0cmFuc2l0aW9uOiB7XG4gICAgbm9QcmVmaXg6ICd0cmFuc2l0aW9uJyxcbiAgICB3ZWJraXRQcmVmaXg6ICctd2Via2l0LXRyYW5zaXRpb24nLFxuICB9LFxufTtcblxuZnVuY3Rpb24gaGFzUHJvcGVyU2hhcGUod2luZG93T2JqKSB7XG4gIHJldHVybiAod2luZG93T2JqLmRvY3VtZW50ICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHdpbmRvd09iai5kb2N1bWVudC5jcmVhdGVFbGVtZW50ID09PSAnZnVuY3Rpb24nKTtcbn1cblxuZnVuY3Rpb24gZXZlbnRGb3VuZEluTWFwcyhldmVudFR5cGUpIHtcbiAgcmV0dXJuIChldmVudFR5cGUgaW4gZXZlbnRUeXBlTWFwIHx8IGV2ZW50VHlwZSBpbiBjc3NQcm9wZXJ0eU1hcCk7XG59XG5cbi8vIElmICdhbmltYXRpb24nIG9yICd0cmFuc2l0aW9uJyBleGlzdCBhcyBzdHlsZSBwcm9wZXJ0eSwgd2Via2l0IHByZWZpeCBpc24ndCBuZWNlc3NhcnkuIFNpbmNlIHdlIGFyZSB1bmFibGUgdG9cbi8vIHNlZSB0aGUgZXZlbnQgdHlwZXMgb24gdGhlIGVsZW1lbnQsIHdlIG11c3QgcmVseSBvbiB0aGUgY29ycmVzcG9uZGluZyBzdHlsZSBwcm9wZXJ0aWVzLlxuZnVuY3Rpb24gZ2V0SmF2YVNjcmlwdEV2ZW50TmFtZShldmVudFR5cGUsIG1hcCwgZWwpIHtcbiAgc3dpdGNoIChldmVudFR5cGUpIHtcbiAgICBjYXNlICdhbmltYXRpb25zdGFydCc6XG4gICAgY2FzZSAnYW5pbWF0aW9uZW5kJzpcbiAgICBjYXNlICdhbmltYXRpb25pdGVyYXRpb24nOlxuICAgICAgcmV0dXJuICdhbmltYXRpb24nIGluIGVsLnN0eWxlID8gbWFwW2V2ZW50VHlwZV0ubm9QcmVmaXggOiBtYXBbZXZlbnRUeXBlXS53ZWJraXRQcmVmaXg7XG4gICAgY2FzZSAndHJhbnNpdGlvbmVuZCc6XG4gICAgICByZXR1cm4gJ3RyYW5zaXRpb24nIGluIGVsLnN0eWxlID8gbWFwW2V2ZW50VHlwZV0ubm9QcmVmaXggOiBtYXBbZXZlbnRUeXBlXS53ZWJraXRQcmVmaXg7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBtYXBbZXZlbnRUeXBlXS5ub1ByZWZpeDtcbiAgfVxufVxuXG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGJyb3dzZXIgcHJlZml4IGZvciBDU1MzIGFuaW1hdGlvbiBldmVudHNcbi8vIGFuZCBwcm9wZXJ0eSBuYW1lc1xuLy9cbi8vIFBhcmFtZXRlcnM6XG4vLyB3aW5kb3dPYmplY3Q6IE9iamVjdCAtLSBDb250YWlucyBEb2N1bWVudCB3aXRoIGEgYGNyZWF0ZUVsZW1lbnQoKWAgbWV0aG9kXG4vLyBldmVudFR5cGU6IHN0cmluZyAtLSBUaGUgdHlwZSBvZiBhbmltYXRpb25cbi8vXG4vLyByZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgZXZlbnQgYXMgYSBzdHJpbmcsIHByZWZpeGVkIGlmIG5lY2Vzc2FyeS5cbi8vIElmIHByb3BlciBhcmd1bWVudHMgYXJlIG5vdCBzdXBwbGllZCwgdGhpcyBmdW5jdGlvbiB3aWxsIHJldHVyblxuLy8gdGhlIHByb3BlcnR5IG9yIGV2ZW50IHR5cGUgd2l0aG91dCB3ZWJraXQgcHJlZml4LlxuLy9cbmZ1bmN0aW9uIGdldEFuaW1hdGlvbk5hbWUod2luZG93T2JqLCBldmVudFR5cGUpIHtcbiAgaWYgKCFoYXNQcm9wZXJTaGFwZSh3aW5kb3dPYmopIHx8ICFldmVudEZvdW5kSW5NYXBzKGV2ZW50VHlwZSkpIHtcbiAgICByZXR1cm4gZXZlbnRUeXBlO1xuICB9XG5cbiAgY29uc3QgbWFwID0gZXZlbnRUeXBlIGluIGV2ZW50VHlwZU1hcCA/IGV2ZW50VHlwZU1hcCA6IGNzc1Byb3BlcnR5TWFwO1xuICBjb25zdCBlbCA9IHdpbmRvd09iai5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbGV0IGV2ZW50TmFtZSA9ICcnO1xuXG4gIGlmIChtYXAgPT09IGV2ZW50VHlwZU1hcCkge1xuICAgIGV2ZW50TmFtZSA9IGdldEphdmFTY3JpcHRFdmVudE5hbWUoZXZlbnRUeXBlLCBtYXAsIGVsKTtcbiAgfSBlbHNlIHtcbiAgICBldmVudE5hbWUgPSBtYXBbZXZlbnRUeXBlXS5ub1ByZWZpeCBpbiBlbC5zdHlsZSA/IG1hcFtldmVudFR5cGVdLm5vUHJlZml4IDogbWFwW2V2ZW50VHlwZV0ud2Via2l0UHJlZml4O1xuICB9XG5cbiAgcmV0dXJuIGV2ZW50TmFtZTtcbn1cblxuLy8gUHVibGljIGZ1bmN0aW9ucyB0byBhY2Nlc3MgZ2V0QW5pbWF0aW9uTmFtZSgpIGZvciBKYXZhU2NyaXB0IGV2ZW50cyBvciBDU1Ncbi8vIHByb3BlcnR5IG5hbWVzLlxuLy9cbi8vIFBhcmFtZXRlcnM6XG4vLyB3aW5kb3dPYmplY3Q6IE9iamVjdCAtLSBDb250YWlucyBEb2N1bWVudCB3aXRoIGEgYGNyZWF0ZUVsZW1lbnQoKWAgbWV0aG9kXG4vLyBldmVudFR5cGU6IHN0cmluZyAtLSBUaGUgdHlwZSBvZiBhbmltYXRpb25cbi8vXG4vLyByZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgZXZlbnQgYXMgYSBzdHJpbmcsIHByZWZpeGVkIGlmIG5lY2Vzc2FyeS5cbi8vIElmIHByb3BlciBhcmd1bWVudHMgYXJlIG5vdCBzdXBwbGllZCwgdGhpcyBmdW5jdGlvbiB3aWxsIHJldHVyblxuLy8gdGhlIHByb3BlcnR5IG9yIGV2ZW50IHR5cGUgd2l0aG91dCB3ZWJraXQgcHJlZml4LlxuLy9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb3JyZWN0RXZlbnROYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKSB7XG4gIHJldHVybiBnZXRBbmltYXRpb25OYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvcnJlY3RQcm9wZXJ0eU5hbWUod2luZG93T2JqLCBldmVudFR5cGUpIHtcbiAgcmV0dXJuIGdldEFuaW1hdGlvbk5hbWUod2luZG93T2JqLCBldmVudFR5cGUpO1xufSJdfQ==
